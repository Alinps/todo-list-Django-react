import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import axios from '../api/axios';
import { getAccessToken, clearTokens } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${getAccessToken()}`
  };

  const loadTasks = async () => {
    try {
      const res = await axios.get('tasks/', { headers });
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        clearTokens();
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async (task) => {
    const res = await axios.post('tasks/', task, { headers });
    setTasks([...tasks, res.data]);
  };

  const handleToggle = async (id) => {
    const task = tasks.find(t => t.id === id);
    const updated = { ...task, completed: !task.completed };
    await axios.put(`tasks/${id}/`, updated, { headers });
    setTasks(tasks.map(t => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await axios.delete(`tasks/${id}/`, { headers });
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.completed;
    if (filter === 'uncompleted') return !t.completed;
    return true;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-2">
        <h3>My To-Do List</h3>
        <button className="btn btn-sm btn-outline-danger" onClick={() => {
          clearTokens();
          navigate('/login');
        }}>Logout</button>
      </div>

      <div className="btn-group mb-3">
        <button className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('all')}>All</button>
        <button className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('completed')}>Completed</button>
        <button className={`btn btn-sm ${filter === 'uncompleted' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('uncompleted')}>Uncompleted</button>
      </div>

      <TaskForm onAdd={handleAdd} />
      <TaskList tasks={filteredTasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
