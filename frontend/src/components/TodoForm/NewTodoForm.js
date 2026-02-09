import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX } from 'react-icons/fi';
import { Input, Button } from '../Input';
import { Heading } from '../Typography';

const NewTodoForm = ({ onSubmit, editingTodo, onUpdate, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || '');
      setDescription(editingTodo.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
    setErrors({});
  }, [editingTodo]);

  const validate = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters';
    } else if (description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const todo = {
      title: title.trim(),
      description: description.trim(),
      isCompleted: editingTodo?.isCompleted || false,
    };

    try {
      if (editingTodo) {
        await onUpdate(editingTodo._id, todo);
      } else {
        await onSubmit(todo);
      }
      
      // Reset form
      setTitle('');
      setDescription('');
      setErrors({});
    } catch (error) {
      setErrors({ submit: 'Failed to save todo. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setErrors({});
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const styles = {
    container: {
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '2rem',
      border: '1px solid var(--border-light)',
      boxShadow: 'var(--shadow-base)',
    },
    header: {
      marginBottom: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    form: {
      width: '100%',
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.75rem',
      marginTop: '1rem',
    },
  };

  return (
    <motion.div
      layout
      style={styles.container}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={styles.header}>
        <Heading level={3} weight="bold">
          {editingTodo ? 'Edit Todo' : 'Create New Todo'}
        </Heading>
        
        {editingTodo && (
          <motion.button
            onClick={handleCancel}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
            }}
            aria-label="Cancel editing"
          >
            <FiX size={24} />
          </motion.button>
        )}
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <Input
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) {
              setErrors({ ...errors, title: undefined });
            }
          }}
          error={errors.title}
          required
          placeholder="Enter todo title"
          aria-label="Todo title"
        />

        <Input
          label="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) {
              setErrors({ ...errors, description: undefined });
            }
          }}
          error={errors.description}
          required
          multiline
          rows={4}
          placeholder="Enter todo description"
          aria-label="Todo description"
        />

        <AnimatePresence>
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                padding: '0.75rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '8px',
                marginBottom: '1rem',
                color: 'var(--interactive-error)',
                fontSize: '0.875rem',
              }}
            >
              {errors.submit}
            </motion.div>
          )}
        </AnimatePresence>

        <div style={styles.buttonGroup}>
          <Button
            type="submit"
            variant="primary"
            fullWidth={!editingTodo}
            icon={!editingTodo && <FiPlus size={18} />}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {editingTodo ? 'Update Todo' : 'Add Todo'}
          </Button>
          
          {editingTodo && (
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default NewTodoForm;
