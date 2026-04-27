import React from "react";

function TodoFilter({ setFilter, currentFilter }) {
  const filters = ["all", "completed", "pending"];

  return (
    <div style={{ marginBottom: "20px" }}>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`filter-btn ${currentFilter === f ? "active" : ""}`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;