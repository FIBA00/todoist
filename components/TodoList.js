"use client";

import TodoItem from "./TodoItem.js";

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p>No Todos yet</p>;
  }
  function handleTodo(todo) {
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    );
  }
  return (
    <div>
      <ul className="flex flex-col gap-2">{todos.map(handleTodo)}</ul>
    </div>
  );
}
