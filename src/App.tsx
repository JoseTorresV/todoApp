import "./App.scss";
import { AddTodoForm } from "./components/form/AddTodoForm";
import { TodoList } from "./components/list/TodoList";

function App() {
  return (
    <div className="container-app">
      {/* <h1>Todo List</h1> */}
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App;
