import { create } from "zustand";
import { persist } from "zustand/middleware";

// Interfaccia per i Todo
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Interface per lo stato dello store
interface TodoStoreState {
  todos: Todo[];
  addTodo: (title: string, userId?: number) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, updatedData: Partial<Todo>) => void;
  fetchTodos: () => void;
  // variabili per la gestione dell'inpaginazione
  currentPage: number;
  pageSize: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const calculateTotalPages = (todos: Todo[], pageSize: number) => {
  return Math.ceil(todos.length / pageSize);
};

/**
 * Questa funzione ritorna un oggetto contenente i metodi da utilizzare per gestire l'app
 */
const useTodoStore = create<TodoStoreState>()(
  persist(
    (set, get) => ({
      todos: [],
      currentPage: 1,
      pageSize: 10, // Numero di risultati per pagina
      totalPages: 0,

      addTodo: (title: string, userId: number = 1) =>
        set((state) => {
          const newTodos = [
            ...state.todos,
            {
              userId,
              id: Date.now(),
              title,
              completed: false
            }
          ];

          return {
            todos: newTodos,
            totalPages: calculateTotalPages(newTodos, state.pageSize)
          }

        }),

      removeTodo: (idTodo: number) =>
        set((state) => {
          const newTodos = state.todos.filter(({ id }) => id !== idTodo);
          const newTotalPages = calculateTotalPages(newTodos, state.pageSize);
          // evita che possa andare in una pagina vuota
          const newCurrentPage = Math.min(state.currentPage, newTotalPages);

          return {
            todos: newTodos,
            totalPages: newTotalPages,
            currentPage: newCurrentPage
          }
        }),

      toggleTodo: (id: number) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      fetchTodos: async () => {
        try {
          const url: string = `https://jsonplaceholder.typicode.com/todos`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error('Unexpected error');
          }
          const data: Todo[] = await response.json();

          const totalPages = calculateTotalPages(data, 10);

          set({ todos: data, totalPages })
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      },

      // Nuovo metodo per modificare un todo
      updateTodo: (id: number, updatedData: Partial<Todo>) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedData } : todo
          ),
        })),

      // Math.min serve per evitare che la pagina corrente superi il totalPages
      // Math.max serve per evitare che la pagina corrente sia inferiore a 1
      setPage: (page: number) =>
        set((state) => ({
          currentPage: Math.min(Math.max(page, 1), state.totalPages),
        })),

    }),
    {
      name: "todo-storage", // Nome della chiave in `localStorage`
      partialize: (state) => ({ todos: state.todos }), // Rendi persistente solo `todos`
      onRehydrateStorage: () => (state) => {
        // Ricalcola `totalPages` quando lo store viene reidratato da `localStorage`
        if (state) {
          state.totalPages = calculateTotalPages(state.todos, state.pageSize);
        }
      },
    }
  )

);

export default useTodoStore;
