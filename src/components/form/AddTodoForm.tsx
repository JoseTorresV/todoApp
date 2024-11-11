import { useState } from "react";
import useTodoStore from "../../store/todoStore";
import "./AddTodoForm.scss";

export const AddTodoForm = () => {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <div className="todo-container">
      <header className="todo-header">Todo List</header>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
