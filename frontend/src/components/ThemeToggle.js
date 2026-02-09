import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../theme/ThemeProvider';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'relative',
        width: '64px',
        height: '32px',
        backgroundColor: isDarkMode ? 'var(--interactive-primary)' : 'var(--border-medium)',
        borderRadius: '9999px',
        padding: '4px',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 200ms ease',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Background track */}
      <motion.div
        style={{
          position: 'absolute',
          top: '4px',
          left: isDarkMode ? '36px' : '4px',
          width: '24px',
          height: '24px',
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
        animate={{
          x: isDarkMode ? 0 : 0,
          left: isDarkMode ? '36px' : '4px',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
      
      {/* Icons */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 6px',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{
            scale: isDarkMode ? 0.8 : 1,
            opacity: isDarkMode ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <FiSun
            size={14}
            color={isDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#F59E0B'}
          />
        </motion.div>
        
        <motion.div
          animate={{
            scale: isDarkMode ? 1 : 0.8,
            opacity: isDarkMode ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        >
          <FiMoon
            size={14}
            color={isDarkMode ? '#fff' : 'rgba(100, 116, 139, 0.7)'}
          />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
