import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoCard from '../TodoCard';
import FilterBar from './FilterBar';
import EmptyState from './EmptyState';
import { Text } from '../Typography';

const EnhancedTodoList = ({ todos, onDelete, onEdit, onToggleComplete }) => {
  const [filter, setFilter] = useState('all');

  // Calculate counts
  const totalCount = todos.length;
  const activeCount = todos.filter(t => !t.isCompleted).length;
  const completedCount = todos.filter(t => t.isCompleted).length;

  // Filter todos
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.isCompleted);
      case 'completed':
        return todos.filter(t => t.isCompleted);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Sort todos: incomplete first, then by date
  const sortedTodos = useMemo(() => {
    return [...filteredTodos].sort((a, b) => {
      // First, sort by completion status
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      // Then by date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [filteredTodos]);

  const styles = {
    container: {
      width: '100%',
    },
    list: {
      width: '100%',
    },
    stats: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      marginTop: '1rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '12px',
      border: '1px solid var(--border-light)',
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.25rem',
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: 'var(--interactive-primary)',
    },
    statLabel: {
      fontSize: '0.75rem',
      color: 'var(--text-tertiary)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
  };

  if (totalCount === 0) {
    return (
      <div style={styles.container}>
        <EmptyState filter="all" />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        totalCount={totalCount}
        activeCount={activeCount}
        completedCount={completedCount}
      />

      <AnimatePresence mode="wait">
        {sortedTodos.length === 0 ? (
          <EmptyState filter={filter} key="empty" />
        ) : (
          <motion.div
            key="list"
            style={styles.list}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnimatePresence mode="popLayout">
              {sortedTodos.map((todo, index) => (
                <motion.div
                  key={todo._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.05 }
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: -100,
                    transition: { duration: 0.2 }
                  }}
                  layout
                >
                  <TodoCard
                    todo={todo}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onToggleComplete={onToggleComplete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {totalCount > 0 && (
        <motion.div
          style={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div style={styles.statItem}>
            <div style={styles.statValue}>{totalCount}</div>
            <Text size="xs" color="tertiary" weight="medium">
              TOTAL
            </Text>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{activeCount}</div>
            <Text size="xs" color="tertiary" weight="medium">
              ACTIVE
            </Text>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{completedCount}</div>
            <Text size="xs" color="tertiary" weight="medium">
              COMPLETED
            </Text>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>
              {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
            </div>
            <Text size="xs" color="tertiary" weight="medium">
              PROGRESS
            </Text>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedTodoList;
