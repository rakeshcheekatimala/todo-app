import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import axios from 'axios';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:4300/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (todo) => {
    try {
      const response = await axios.post('http://localhost:4300/todos', todo);
      setTodos([response.data, ...todos]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`http://localhost:4300/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:4300/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Todo List
          </Typography>
          <TodoForm
            onSubmit={handleAddTodo}
            editingTodo={editingTodo}
            onUpdate={handleUpdateTodo}
          />
          <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onEdit={setEditingTodo}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 