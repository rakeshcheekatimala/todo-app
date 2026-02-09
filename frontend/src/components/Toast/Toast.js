import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';
import { Text } from '../Typography';

const Toast = ({ message, type = 'info', action, onClose }) => {
  const icons = {
    success: FiCheckCircle,
    error: FiXCircle,
    info: FiInfo,
    warning: FiAlertTriangle,
  };

  const colors = {
    success: {
      bg: 'var(--interactive-success)',
      text: 'white',
    },
    error: {
      bg: 'var(--interactive-error)',
      text: 'white',
    },
    info: {
      bg: 'var(--interactive-primary)',
      text: 'white',
    },
    warning: {
      bg: 'var(--interactive-warning)',
      text: 'white',
    },
  };

  const Icon = icons[type];
  const color = colors[type];

  const styles = {
    toast: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem 1.25rem',
      backgroundColor: color.bg,
      color: color.text,
      borderRadius: '12px',
      boxShadow: 'var(--shadow-lg)',
      minWidth: '300px',
      maxWidth: '400px',
    },
    content: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    actions: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
    },
    button: {
      padding: '0.25rem',
      backgroundColor: 'transparent',
      color: 'inherit',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      transition: 'background-color 200ms ease',
    },
    actionButton: {
      padding: '0.375rem 0.75rem',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      fontSize: '0.875rem',
      fontWeight: 600,
      borderRadius: '6px',
    },
  };

  return (
    <motion.div
      style={styles.toast}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
    >
      <div style={styles.content}>
        <Icon size={20} />
        <Text size="sm" weight="medium" style={{ color: 'inherit' }}>
          {message}
        </Text>
      </div>
      
      <div style={styles.actions}>
        {action && (
          <motion.button
            style={{ ...styles.button, ...styles.actionButton }}
            onClick={(e) => {
              e.stopPropagation();
              action.onClick();
              onClose();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {action.label}
          </motion.button>
        )}
        
        <motion.button
          style={styles.button}
          onClick={onClose}
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close notification"
        >
          <FiX size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Toast;
