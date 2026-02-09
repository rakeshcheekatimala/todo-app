import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ 
  width = '100%', 
  height = '1rem', 
  borderRadius = '4px',
  style = {},
  ...props 
}) => {
  const styles = {
    skeleton: {
      width,
      height,
      borderRadius,
      backgroundColor: 'var(--bg-tertiary)',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    },
  };

  return (
    <div style={styles.skeleton} {...props}>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default Skeleton;
