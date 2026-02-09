import React from 'react';

const Text = ({ 
  size = 'base',
  weight = 'normal',
  color = 'primary',
  align = 'left',
  children,
  className = '',
  as = 'p',
  ...props
}) => {
  const Tag = as;
  
  const styles = {
    fontFamily: 'var(--font-sans)',
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
    }[size],
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }[weight],
    color: color === 'primary' ? 'var(--text-primary)' :
           color === 'secondary' ? 'var(--text-secondary)' :
           color === 'tertiary' ? 'var(--text-tertiary)' :
           color === 'disabled' ? 'var(--text-disabled)' :
           color,
    textAlign: align,
    margin: 0,
    lineHeight: 1.5,
  };

  return (
    <Tag style={styles} className={className} {...props}>
      {children}
    </Tag>
  );
};

export default Text;
