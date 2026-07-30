"use client";

export default function Stats({ stats }) {
  return (
    <div className="flex gap-4 my-4">
      <div>
        {" "}
        <strong>{stats.total}</strong>
        Total
      </div>
      <div>
        {" "}
        <strong>{stats.completed}</strong>
        Completed
      </div>
      <div>
        {" "}
        <strong>{stats.remaining}</strong>
        Remaining
      </div>
      <div>
        {" "}
        <strong>{stats.completionRate}</strong>
        Rate
      </div>
    </div>
  );
}
