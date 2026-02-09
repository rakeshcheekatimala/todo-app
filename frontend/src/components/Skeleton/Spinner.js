import React from 'react';
import { motion } from 'framer-motion';

const Spinner = ({ 
  size = 'medium',
  color = 'var(--interactive-primary)',
  style = {},
}) => {
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32,
  };

  const spinnerSize = typeof size === 'number' ? size : sizeMap[size];

  const styles = {
    container: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    },
    spinner: {
      width: spinnerSize,
      height: spinnerSize,
      border: `2px solid ${color}`,
      borderTopColor: 'transparent',
      borderRadius: '50%',
    },
  };

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default Spinner;
