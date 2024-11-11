import { useState } from "react";
import useTodoStore, { Todo } from "../../store/todoStore";
import "./TodoItem.scss";

interface TodoItem {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItem) => {
  const { id, completed, title } = todo;
  const { removeTodo, toggleTodo, updateTodo } = useTodoStore();

  // Gestione del flag isEditing per mostrare e nascondere la modalità edit
  const [isEditing, setIsEditing] = useState(false);
  // Gestione dello stato del todo (title)
  const [newTitle, setNewTitle] = useState(title);

  /**
   *  Attiva la modalità di modifica
   */
  const handleEditClick = () => {
    setIsEditing(true);
  };

  /**
   * Salva il nuovo todo e disattiva la modalità di modifica
   */
  const handleSaveClick = () => {
    updateTodo(id, { title: newTitle });
    setIsEditing(false);
  };

  /**
   * Ripristina il titolo originale e disattiva la modalità di modifica
   */
  const handleCancelClick = () => {
    setNewTitle(title);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      <div className="container-todo">
        <input
          className="checkbox"
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo(id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="edit-input"
          />
        ) : (
          <p style={{ textDecoration: completed ? "line-through" : "none" }}>
            {title}
          </p>
        )}
      </div>
      <div className="container-buttons">
        {!isEditing && (
          <button className="delete-button" onClick={() => removeTodo(id)}>
            Delete
          </button>
        )}
        {isEditing ? (
          <>
            <button className="save-button" onClick={handleSaveClick}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        ) : (
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
        )}
      </div>
    </li>
  );
};
