// src/context/TaskContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get('tasks/');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (text, date) => {
    try {
      const res = await api.post('tasks/', { text, date });
      setTasks(prev => [...prev, res.data]);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const deleteTask = async id => {
    try {
      await api.delete(`tasks/${id}/`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const res = await api.put(`tasks/${id}/`, updatedTask);
      setTasks(prev => prev.map(t => (t.id === id ? res.data : t)));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
