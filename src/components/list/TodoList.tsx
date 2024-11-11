import { useEffect } from "react";
import useTodoStore, { Todo } from "../../store/todoStore";
import { TodoItem } from "../todo-item/TodoItem";
import { Pagination } from "../pagination/Pagination";
import "./TodoList.scss";

export const TodoList = () => {
  const { todos, fetchTodos, currentPage, pageSize } = useTodoStore();

  useEffect(() => {
    if (todos.length === 0) {
      fetchTodos();
    }
  }, [fetchTodos, todos]);

  const startIndex = (currentPage - 1) * pageSize;
  // Qui si fa lo slice per mostrare sempre 10 elementi in ogni pagina
  const currentTodos = todos.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <ul className="todo-list">
        {currentTodos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <Pagination />
    </>
  );
};
