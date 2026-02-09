import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Heading } from './components/Typography';
import { TodoCardSkeleton } from './components/Skeleton';
import { useToast } from './context/ToastContext';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:4300/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast.error('Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTodo = async (todo) => {
    try {
      const response = await axios.post('http://localhost:4300/todos', todo);
      setTodos([response.data, ...todos]);
      toast.success('Todo created successfully!');
    } catch (error) {
      console.error('Error adding todo:', error);
      toast.error('Failed to create todo');
      throw error;
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`http://localhost:4300/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
      setEditingTodo(null);
      toast.success('Todo updated successfully!');
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Failed to update todo');
      throw error;
    }
  };

  const handleDeleteTodo = async (id) => {
    const deletedTodo = todos.find(t => t._id === id);
    
    try {
      await axios.delete(`http://localhost:4300/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      
      // Show toast with undo option
      toast.success('Todo deleted', {
        label: 'Undo',
        onClick: async () => {
          try {
            const response = await axios.post('http://localhost:4300/todos', deletedTodo);
            setTodos(prev => [response.data, ...prev]);
            toast.info('Todo restored');
          } catch (error) {
            toast.error('Failed to restore todo');
          }
        }
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete todo');
    }
  };

  const handleToggleComplete = async (todo) => {
    await handleUpdateTodo(todo._id, {
      ...todo,
      isCompleted: !todo.isCompleted,
    });
  };

  return (
    <Layout maxWidth="800px">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Heading level={1} animate>
          My Tasks
        </Heading>
      </div>
      
      <TodoForm
        onSubmit={handleAddTodo}
        editingTodo={editingTodo}
        onUpdate={handleUpdateTodo}
        onCancelEdit={() => setEditingTodo(null)}
      />
      
      {isLoading ? (
        <div>
          {[1, 2, 3].map((i) => (
            <TodoCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <TodoList
          todos={todos}
          onDelete={handleDeleteTodo}
          onEdit={setEditingTodo}
          onToggleComplete={handleToggleComplete}
        />
      )}
    </Layout>
  );
}

export default App; 