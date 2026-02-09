import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiInbox } from 'react-icons/fi';
import { Heading, Text } from '../Typography';

const EmptyState = ({ filter }) => {
  const getEmptyStateContent = () => {
    switch (filter) {
      case 'active':
        return {
          icon: FiCheckCircle,
          title: 'All caught up!',
          description: 'You have no active tasks. Time to relax or add new ones!',
          color: 'var(--interactive-success)',
        };
      case 'completed':
        return {
          icon: FiCheckCircle,
          title: 'No completed tasks yet',
          description: 'Complete some tasks to see them here.',
          color: 'var(--interactive-primary)',
        };
      default:
        return {
          icon: FiInbox,
          title: 'No todos yet',
          description: 'Create your first todo to get started!',
          color: 'var(--interactive-primary)',
        };
    }
  };

  const content = getEmptyStateContent();
  const Icon = content.icon;

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '16px',
      border: '2px dashed var(--border-light)',
      textAlign: 'center',
    },
    iconContainer: {
      marginBottom: '1.5rem',
      color: content.color,
      opacity: 0.5,
    },
    title: {
      marginBottom: '0.75rem',
    },
  };

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        style={styles.iconContainer}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <Icon size={80} strokeWidth={1.5} />
      </motion.div>
      
      <Heading level={3} style={styles.title}>
        {content.title}
      </Heading>
      
      <Text color="secondary">
        {content.description}
      </Text>
    </motion.div>
  );
};

export default EmptyState;
