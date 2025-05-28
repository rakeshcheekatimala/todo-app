import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Paper,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

function TodoList({ todos, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="body1" align="center" color="textSecondary">
          No todos yet. Add one above!
        </Typography>
      </Paper>
    );
  }

  return (
    <List>
      {todos.map((todo) => (
        <Paper
          key={todo._id}
          elevation={2}
          sx={{ mb: 2 }}
        >
          <ListItem>
            <Checkbox
              checked={todo.isCompleted}
              onChange={() => onEdit({ ...todo, isCompleted: !todo.isCompleted })}
            />
            <ListItemText
              primary={todo.title}
              secondary={todo.description}
              sx={{
                textDecoration: todo.isCompleted ? 'line-through' : 'none',
                color: todo.isCompleted ? 'text.secondary' : 'text.primary',
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEdit(todo)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(todo._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}

export default TodoList; 