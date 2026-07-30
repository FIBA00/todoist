"use client";
import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
  getStats,
} from "@/app/actions/todos.js";

import TodoForm from "@/components/TodoForm.js";
import TodoList from "@/components/TodoList.js";
import Stats from "@/components/Stats.js";

export default function TodosPage() {
  const [todos, setTodos] = useState([]); // array of todos
  const [todoStats, setTodoStats] = useState(null); // state can be any thing
  const [loadingTodos, setLoadingTodos] = useState(true); // boolean
  const [todosError, setTodosError] = useState(""); // string only
  useEffect(LoadTodos(), []);

  function LoadTodos() {
    load();
  }

  async function load() {
    try {
      setLoadingTodos(true);
      setTodosError("");
      const todosResult = await getTodos();
      if (todosResult.success) {
        setTodos(todosResult.data);
      }

      const statsResult = await getStats();
      if (statsResult.success) {
        setTodoStats(statsResult.data);
      }
      setLoadingTodos(false);
    } catch (error) {
      console.error("Error occurred while loading todos data, ", error);
      setTodosError(error.message);
    }
  }

  async function handleCreateTodo(formData) {
    try {
      const result = await createTodo(formdata);
      if (result.success) {
        await load();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(`Error occurred : ${error.message}`);
    }
  }
  async function handleToggleTodo(todoId) {
    try {
      const result = await toggleTodo(todoId);
      if (result.success) {
        await load();
      }
    } catch (error) {
      alert(`Error occurred: ${error.message}`);
    }
  }
  async function handleDeleteTodo(todoId) {
    try {
      const result = await deleteTodo(todoId);
      if (result.success) {
        await load();
      }
    } catch (error) {
      alert(`Error occurred: ${error.message}`);
    }
  }
  if (loadingTodos) return <p>Loading Todos....</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My TODOS</h1>

      <div className="flex flex-row">{stats && <Stats stats={stats} />}</div>
      {/* components */}
      <TodoForm onSubmit={handleCreateTodo} />
      <TodoList
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}
