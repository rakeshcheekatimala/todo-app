import React from 'react';
import { motion } from 'framer-motion';

const Heading = ({ 
  level = 1, 
  children, 
  weight = 'bold',
  color = 'primary',
  align = 'left',
  className = '',
  animate = false,
  ...props 
}) => {
  const Tag = `h${level}`;
  
  const styles = {
    fontFamily: 'var(--font-sans)',
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    }[weight],
    color: color === 'primary' ? 'var(--text-primary)' :
           color === 'secondary' ? 'var(--text-secondary)' :
           color === 'tertiary' ? 'var(--text-tertiary)' :
           color,
    textAlign: align,
    margin: 0,
    lineHeight: level <= 2 ? 1.2 : 1.3,
    fontSize: {
      1: 'clamp(2rem, 5vw, 3rem)',      // 32px - 48px
      2: 'clamp(1.5rem, 4vw, 2.25rem)', // 24px - 36px
      3: 'clamp(1.25rem, 3vw, 1.875rem)', // 20px - 30px
      4: '1.25rem',                      // 20px
      5: '1.125rem',                     // 18px
      6: '1rem',                         // 16px
    }[level],
  };

  const Component = animate ? motion[Tag] : Tag;
  const animationProps = animate ? {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  return (
    <Component 
      style={styles} 
      className={className}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Heading;
