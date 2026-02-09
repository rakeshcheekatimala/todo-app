import React from 'react';
import { motion } from 'framer-motion';

const Layout = ({ children, maxWidth = '1024px' }) => {
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      transition: 'background-color 200ms ease',
    },
    main: {
      maxWidth: maxWidth,
      margin: '0 auto',
      padding: '2rem 1.5rem',
      minHeight: 'calc(100vh - 80px)', // Account for header
    },
  };

  return (
    <div style={styles.container}>
      <motion.main 
        style={styles.main}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
