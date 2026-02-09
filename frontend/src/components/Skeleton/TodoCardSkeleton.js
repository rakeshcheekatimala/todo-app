import React from 'react';
import { motion } from 'framer-motion';
import Skeleton from './Skeleton';

const TodoCardSkeleton = () => {
  const styles = {
    card: {
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '12px',
      padding: '1.25rem',
      marginBottom: '0.75rem',
      border: '1px solid var(--border-light)',
      borderLeftWidth: '4px',
      borderLeftColor: 'var(--border-medium)',
    },
    content: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
    },
    textSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
  };

  return (
    <motion.div
      style={styles.card}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div style={styles.content}>
        <Skeleton width="24px" height="24px" borderRadius="6px" />
        
        <div style={styles.textSection}>
          <Skeleton width="60%" height="1.25rem" borderRadius="6px" />
          <Skeleton width="90%" height="1rem" borderRadius="4px" />
          <Skeleton width="80%" height="1rem" borderRadius="4px" />
          <div style={{ marginTop: '0.5rem' }}>
            <Skeleton width="120px" height="0.875rem" borderRadius="4px" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoCardSkeleton;
