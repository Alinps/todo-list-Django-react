import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // Set Auth token
  const token = localStorage.getItem('access_token');
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleAddTask = async () => {
    if (!text || !dueDate) return;
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/tasks/${editingId}/`, { text, due_date: dueDate });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:8000/api/tasks/', { text, due_date: dueDate });
      }
      setText('');
      setDueDate('');
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}/`);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.patch(`http://localhost:8000/api/tasks/${id}/`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error('Failed to toggle:', error);
    }
  };

  const handleEdit = (task) => {
    setText(task.text);
    setDueDate(task.due_date);
    setEditingId(task.id);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">To-Do List</h2>
      <div className="d-flex mb-3">
        <input type="text" className="form-control mr-2" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter task" />
        <input type="date" className="form-control mr-2" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button className="btn btn-primary" onClick={handleAddTask}>
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id, task.completed)} className="mr-2" />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text} (Due: {new Date(task.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })})
              </span>
            </div>
            <div>
              <button className="btn btn-sm btn-info mr-2" onClick={() => handleEdit(task)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
