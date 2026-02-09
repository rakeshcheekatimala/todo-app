import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import { Text, Caption } from '../Typography';
import Checkbox from '../Checkbox';

const TodoCard = ({ 
  todo, 
  onDelete, 
  onEdit, 
  onToggleComplete,
  priority = 'medium' 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const priorityColors = {
    low: '#10B981',
    medium: '#3B82F6',
    high: '#F59E0B',
    urgent: '#EF4444',
  };

  const styles = {
    card: {
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '12px',
      padding: '1.25rem',
      marginBottom: '0.75rem',
      border: '1px solid var(--border-light)',
      borderLeftWidth: '4px',
      borderLeftColor: priorityColors[priority] || priorityColors.medium,
      transition: 'all 200ms ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    },
    cardHovered: {
      boxShadow: 'var(--shadow-md)',
      transform: 'translateY(-2px)',
      borderColor: 'var(--border-medium)',
    },
    content: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
    },
    textSection: {
      flex: 1,
      minWidth: 0,
    },
    title: {
      marginBottom: '0.5rem',
      textDecoration: todo.isCompleted ? 'line-through' : 'none',
      opacity: todo.isCompleted ? 0.6 : 1,
      transition: 'all 200ms ease',
    },
    description: {
      marginBottom: '0.75rem',
      textDecoration: todo.isCompleted ? 'line-through' : 'none',
      opacity: todo.isCompleted ? 0.5 : 1,
      transition: 'all 200ms ease',
      wordBreak: 'break-word',
    },
    actions: {
      display: 'flex',
      gap: '0.5rem',
      opacity: isHovered ? 1 : 0,
      transition: 'opacity 200ms ease',
    },
    actionButton: {
      padding: '0.5rem',
      borderRadius: '6px',
      backgroundColor: 'transparent',
      color: 'var(--text-secondary)',
      cursor: 'pointer',
      transition: 'all 150ms ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
    },
    editButton: {
      ':hover': {
        backgroundColor: 'var(--bg-tertiary)',
        color: 'var(--interactive-primary)',
      },
    },
    deleteButton: {
      ':hover': {
        backgroundColor: 'var(--bg-tertiary)',
        color: 'var(--interactive-error)',
      },
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '0.75rem',
      paddingTop: '0.75rem',
      borderTop: '1px solid var(--border-light)',
    },
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHovered : {}),
      }}
    >
      <div style={styles.content}>
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => onToggleComplete(todo)}
          aria-label={`Mark ${todo.title} as ${todo.isCompleted ? 'incomplete' : 'complete'}`}
        />
        
        <div style={styles.textSection}>
          <Text 
            size="lg" 
            weight="semibold" 
            style={styles.title}
          >
            {todo.title}
          </Text>
          
          <Text 
            size="sm" 
            color="secondary" 
            style={styles.description}
          >
            {todo.description}
          </Text>

          {todo.createdAt && (
            <div style={styles.footer}>
              <Caption color="tertiary">
                {formatDate(todo.createdAt)}
              </Caption>
              
              <div style={styles.actions}>
                <motion.button
                  style={styles.actionButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(todo);
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--interactive-primary)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Edit todo"
                >
                  <FiEdit2 size={16} />
                </motion.button>
                
                <motion.button
                  style={styles.actionButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(todo._id);
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--interactive-error)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Delete todo"
                >
                  <FiTrash2 size={16} />
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Completion celebration effect */}
      <AnimatePresence>
        {todo.isCompleted && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'var(--interactive-success)',
              pointerEvents: 'none',
            }}
          >
            <FiCheck size={120} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoCard;
