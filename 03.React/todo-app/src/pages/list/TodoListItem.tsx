import React from "react";
import { Link } from "react-router-dom";

export interface ItemProps {
  key: number;
  isCompleteCheck: (
    e: React.ChangeEvent<HTMLInputElement>,
    important: boolean,
    _id: number
  ) => void;
  todo: TodoItem;
}

const TodoListItem: React.FC<ItemProps> = ({ key, isCompleteCheck, todo }) => {
  return (
    <li key={key} className="todo-item">
      <button
        type="button"
        className="todo-item--important-button"
        // onClick={handleClick}
      ></button>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => isCompleteCheck(e, todo.important, todo._id)}
        className="todo-item--checkbox"
      />
      <Link to="/" className="todo-item--todoInfo-link">
        {todo.title}
      </Link>
      <button
        className="todo-item-delete-button"
        // onClick={handleDelete}
      ></button>
    </li>
  );
};

export default TodoListItem;
