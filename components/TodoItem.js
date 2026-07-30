'use client'

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div>
      <li className="flex items-center gap-2 border p-2 rounded">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <div className="flex-1">
          <h3 className={todo.completed ? "line-through" : ""}>{todo.title}</h3>
          {todo.description && (
            <p className="text-sm text-gray-500">{todo.description}</p>
          )}
          <span className="text-xs uppercase">{todo.priority}</span>
        </div>
        <button onClick={() => onDelete(todo.id)} className="text-red-600">
          Delete
        </button>
      </li>
    </div>
  );
}
