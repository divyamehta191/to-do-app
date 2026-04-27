import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });

  const [filter, setFilter] = useState("all");
  const BASE_URL = "http://localhost:5000/api/todos";

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        setTodos(data.map((t) => ({ ...t, id: t._id })));
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async (text) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setTodos([{ ...data, id: data._id }, ...todos]);
    } catch (err) {
      console.error(err);
    }
  };

const deleteTodo = async (id) => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  } catch (err) {
    console.error(err);
  }
};
const toggleComplete = async (id) => {
  try {
    // Find the current todo
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    const data = await res.json();

    // Update local state
    setTodos(todos.map((t) =>
      t.id === id ? { ...t, completed: data.completed } : t
    ));
  } catch (err) {
    console.error(err);
  }
};

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="app">
      <div className="todo-container">
        <h1 className="title">Todo App</h1>
        <TodoForm addTodo={addTodo} />
        <TodoFilter setFilter={setFilter} currentFilter={filter} />
        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
}

export default App;