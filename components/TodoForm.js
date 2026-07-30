"use client";

export default function TodoForm({ onSubmit }) {
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    await onSubmit(formData);
    e.target.reset();
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-4">
      <input
        type="text"
        name="title"
        placeholder="What needs to be done ?"
        required
        className="border p-2"
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        className="border p-2"
      />
      <select name="priority" defaultValue="medium" className="border p-2">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input type="date" name="dueDate" className="border p-2" />
      <button
        type="submit"
        className="bg-emerald-700 text-white p-2 rounded-2xl"
      >
        Add Todo
      </button>
    </form>
  );
}
