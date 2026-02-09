import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const Checkbox = ({ checked, onChange, disabled = false, ...props }) => {
  const styles = {
    container: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '24px',
      height: '24px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      flexShrink: 0,
    },
    checkbox: {
      width: '100%',
      height: '100%',
      borderRadius: '6px',
      border: '2px solid',
      borderColor: checked ? 'var(--interactive-primary)' : 'var(--border-medium)',
      backgroundColor: checked ? 'var(--interactive-primary)' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 200ms ease',
    },
    checkIcon: {
      color: 'white',
    },
  };

  return (
    <motion.label
      style={styles.container}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{
          position: 'absolute',
          opacity: 0,
          width: 0,
          height: 0,
        }}
      />
      <motion.div
        style={styles.checkbox}
        animate={{
          borderColor: checked ? 'var(--interactive-primary)' : 'var(--border-medium)',
          backgroundColor: checked ? 'var(--interactive-primary)' : 'transparent',
        }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: checked ? 1 : 0,
            opacity: checked ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          style={styles.checkIcon}
        >
          <FiCheck size={16} strokeWidth={3} />
        </motion.div>
      </motion.div>
    </motion.label>
  );
};

export default Checkbox;
