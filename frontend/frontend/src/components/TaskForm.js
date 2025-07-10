import React, { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !date) return alert("Both fields are required");
    onAdd({ text, date });
    setText('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input type="text" placeholder="Task" value={text} onChange={(e) => setText(e.target.value)} className="form-control mb-2" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control mb-2" />
      <button className="btn btn-primary btn-block">Add Task</button>
    </form>
  );
}
