import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckSquare } from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle';
import { Heading } from '../Typography';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const styles = {
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--bg-secondary)',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled 
        ? '1px solid var(--border-light)' 
        : '1px solid transparent',
      transition: 'all 200ms ease',
      boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '1rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      textDecoration: 'none',
    },
    logoIcon: {
      color: 'var(--interactive-primary)',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
    },
    navLinks: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center',
    },
    navLink: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: 'var(--text-secondary)',
      textDecoration: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      transition: 'all 150ms ease',
      position: 'relative',
    },
    navLinkActive: {
      color: 'var(--interactive-primary)',
      backgroundColor: 'var(--bg-tertiary)',
    },
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logoSection}>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FiCheckSquare size={28} style={styles.logoIcon} />
          </motion.div>
          <Heading level={4} weight="bold">
            TaskFlow
          </Heading>
        </Link>

        <nav style={styles.nav}>
          <div style={styles.navLinks}>
            <Link 
              to="/" 
              style={{
                ...styles.navLink,
                ...(isActive('/') ? styles.navLinkActive : {}),
              }}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Todos
              </motion.span>
            </Link>
            <Link 
              to="/ai" 
              style={{
                ...styles.navLink,
                ...(isActive('/ai') ? styles.navLinkActive : {}),
              }}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                AI Assistant
              </motion.span>
            </Link>
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
