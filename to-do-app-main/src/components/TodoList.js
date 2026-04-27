import React from "react";

function TodoList({ todos, deleteTodo, toggleComplete }) {
  if (todos.length === 0) return <p>No tasks found!</p>;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
           <span
    onClick={() => toggleComplete(todo.id)}
    style={{ cursor: "pointer" }}
  >
    {todo.text}
  </span>
          <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
          {/* <button onClick={() => toggleComplete(todo.id, !todo.completed)}>
            {todo.completed ? "Pending" : "Completed"}
          </button> */}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;