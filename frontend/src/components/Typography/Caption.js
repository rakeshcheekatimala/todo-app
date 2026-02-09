import React from 'react';

const Caption = ({ 
  children,
  color = 'secondary',
  weight = 'normal',
  className = '',
  ...props
}) => {
  const styles = {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.75rem', // 12px
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
    }[weight],
    color: color === 'primary' ? 'var(--text-primary)' :
           color === 'secondary' ? 'var(--text-secondary)' :
           color === 'tertiary' ? 'var(--text-tertiary)' :
           color,
    lineHeight: 1.4,
    margin: 0,
  };

  return (
    <span style={styles} className={className} {...props}>
      {children}
    </span>
  );
};

export default Caption;
