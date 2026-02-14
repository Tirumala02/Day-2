
import './App.css'
import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:3000/todos";

  // 🔹 Get all todos
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // 🔹 Add new todo
  const addTodo = async () => {
    if (!title) return;

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  // 🔹 Mark as completed
  const completeTodo = async (id) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT"
    });

    const updated = await res.json();

    setTodos(todos.map(todo =>
      todo._id === id ? updated : todo
    ));
  };

  // 🔹 Delete todo
  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Simple Todo App</h2>

      <input
        type="text"
        placeholder="Enter todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                marginRight: "10px"
              }}
            >
              {todo.title}
            </span>

            {!todo.completed && (
              <button onClick={() => completeTodo(todo._id)}>
                Complete
              </button>
            )}

            <button onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
