import React from 'react';

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <p className="text-muted">No tasks</p>;

  return (
    <ul className="list-group">
      {tasks.map(task => (
        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="mr-2"
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text} (Due: {new Date(task.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })})
            </span>
          </div>
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
