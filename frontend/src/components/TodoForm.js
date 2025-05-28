import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
} from '@mui/material';

function TodoForm({ onSubmit, editingTodo, onUpdate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const todo = {
      title,
      description,
      isCompleted: editingTodo?.isCompleted || false,
    };

    if (editingTodo) {
      onUpdate(editingTodo._id, todo);
    } else {
      onSubmit(todo);
    }

    setTitle('');
    setDescription('');
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
            multiline
            rows={3}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {editingTodo ? 'Update Todo' : 'Add Todo'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default TodoForm; 