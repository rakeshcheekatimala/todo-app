import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  icon,
  loading = false,
  ...props
}) => {
  const styles = {
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: size === 'small' ? '0.5rem 1rem' :
               size === 'large' ? '1rem 2rem' :
               '0.75rem 1.5rem',
      fontSize: size === 'small' ? '0.875rem' : '1rem',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      borderRadius: '8px',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'all 200ms ease',
      width: fullWidth ? '100%' : 'auto',
      position: 'relative',
      overflow: 'hidden',
      
      // Variant styles
      ...(variant === 'primary' && {
        backgroundColor: 'var(--interactive-primary)',
        color: 'white',
      }),
      ...(variant === 'secondary' && {
        backgroundColor: 'var(--bg-tertiary)',
        color: 'var(--text-primary)',
      }),
      ...(variant === 'outline' && {
        backgroundColor: 'transparent',
        color: 'var(--interactive-primary)',
        border: '2px solid var(--interactive-primary)',
      }),
      ...(variant === 'ghost' && {
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
      }),
      ...(variant === 'danger' && {
        backgroundColor: 'var(--interactive-error)',
        color: 'white',
      }),
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
    },
    spinner: {
      width: '16px',
      height: '16px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTopColor: 'white',
      borderRadius: '50%',
      animation: 'spin 0.6s linear infinite',
    },
  };

  const hoverScale = disabled ? 1 : 1.02;
  const tapScale = disabled ? 1 : 0.98;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      style={styles.button}
      {...props}
    >
      {loading ? (
        <div style={styles.spinner} />
      ) : (
        <>
          {icon && <span style={styles.icon}>{icon}</span>}
          {children}
        </>
      )}
      
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </motion.button>
  );
};

export default Button;
