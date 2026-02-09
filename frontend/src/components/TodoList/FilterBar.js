import React from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiList, FiCheckCircle, FiCircle } from 'react-icons/fi';
import { Text } from '../Typography';

const FilterBar = ({ filter, onFilterChange, totalCount, activeCount, completedCount }) => {
  const filters = [
    { id: 'all', label: 'All', count: totalCount, icon: FiList },
    { id: 'active', label: 'Active', count: activeCount, icon: FiCircle },
    { id: 'completed', label: 'Completed', count: completedCount, icon: FiCheckCircle },
  ];

  const styles = {
    container: {
      display: 'flex',
      gap: '0.75rem',
      padding: '1rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '12px',
      border: '1px solid var(--border-light)',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    filterButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.625rem 1rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 200ms ease',
      fontSize: '0.875rem',
      fontWeight: 500,
      fontFamily: 'var(--font-sans)',
    },
    activeFilter: {
      backgroundColor: 'var(--interactive-primary)',
      color: 'white',
    },
    inactiveFilter: {
      backgroundColor: 'var(--bg-tertiary)',
      color: 'var(--text-secondary)',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '20px',
      height: '20px',
      padding: '0 0.375rem',
      borderRadius: '10px',
      fontSize: '0.75rem',
      fontWeight: 600,
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'var(--text-secondary)',
      fontSize: '0.875rem',
      fontWeight: 500,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.label}>
        <FiFilter size={16} />
        <Text size="sm" weight="medium" color="secondary">
          Filter:
        </Text>
      </div>
      
      {filters.map((f) => {
        const isActive = filter === f.id;
        const Icon = f.icon;
        
        return (
          <motion.button
            key={f.id}
            onClick={() => onFilterChange(f.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              ...styles.filterButton,
              ...(isActive ? styles.activeFilter : styles.inactiveFilter),
            }}
            aria-label={`Show ${f.label.toLowerCase()} todos`}
            aria-pressed={isActive}
          >
            <Icon size={16} />
            {f.label}
            <span
              style={{
                ...styles.badge,
                backgroundColor: isActive 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'var(--bg-primary)',
                color: isActive ? 'white' : 'var(--text-primary)',
              }}
            >
              {f.count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default FilterBar;
