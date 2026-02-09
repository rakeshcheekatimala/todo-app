import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Caption } from '../Typography';

const Input = ({
  label,
  value,
  onChange,
  error,
  type = 'text',
  placeholder = '',
  required = false,
  multiline = false,
  rows = 3,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const isFloating = isFocused || hasValue;

  const styles = {
    container: {
      position: 'relative',
      marginBottom: '1.5rem',
    },
    inputContainer: {
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: multiline ? '1rem' : '1rem 0.75rem',
      paddingTop: '1.5rem',
      fontSize: '1rem',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)',
      backgroundColor: 'var(--bg-secondary)',
      border: '2px solid',
      borderColor: error 
        ? 'var(--interactive-error)'
        : isFocused 
          ? 'var(--interactive-primary)' 
          : 'var(--border-light)',
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 200ms ease',
      resize: multiline ? 'vertical' : 'none',
      minHeight: multiline ? `${rows * 1.5}rem` : 'auto',
    },
    label: {
      position: 'absolute',
      left: '0.75rem',
      top: isFloating ? '0.5rem' : '1rem',
      fontSize: isFloating ? '0.75rem' : '1rem',
      color: error
        ? 'var(--interactive-error)'
        : isFocused
          ? 'var(--interactive-primary)'
          : 'var(--text-tertiary)',
      pointerEvents: 'none',
      transition: 'all 200ms ease',
      backgroundColor: 'var(--bg-secondary)',
      padding: '0 0.25rem',
    },
    error: {
      marginTop: '0.5rem',
      color: 'var(--interactive-error)',
    },
    focusRing: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '8px',
      pointerEvents: 'none',
      border: '2px solid transparent',
      transition: 'all 200ms ease',
    },
  };

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <InputComponent
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFloating ? placeholder : ''}
          required={required}
          style={styles.input}
          rows={multiline ? rows : undefined}
          {...props}
        />
        <motion.label
          style={styles.label}
          animate={{
            top: isFloating ? '0.5rem' : '1rem',
            fontSize: isFloating ? '0.75rem' : '1rem',
          }}
          transition={{ duration: 0.2 }}
        >
          {label} {required && '*'}
        </motion.label>
        
        {isFocused && !error && (
          <motion.div
            style={{
              ...styles.focusRing,
              boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.error}
        >
          <Caption color="error">{error}</Caption>
        </motion.div>
      )}
    </div>
  );
};

export default Input;
