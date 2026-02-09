import React, { createContext, useContext, useEffect, useState } from 'react';
import { lightTheme, darkTheme } from './colors';
import { tokens, fonts } from './tokens';

// Create theme context
const ThemeContext = createContext();

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Check for saved theme preference or default to 'light'
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const theme = isDarkMode ? darkTheme : lightTheme;

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      return newValue;
    });
  };

  // Apply CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme colors
    root.style.setProperty('--bg-primary', theme.background.primary);
    root.style.setProperty('--bg-secondary', theme.background.secondary);
    root.style.setProperty('--bg-tertiary', theme.background.tertiary);
    root.style.setProperty('--bg-elevated', theme.background.elevated);
    
    root.style.setProperty('--text-primary', theme.text.primary);
    root.style.setProperty('--text-secondary', theme.text.secondary);
    root.style.setProperty('--text-tertiary', theme.text.tertiary);
    root.style.setProperty('--text-disabled', theme.text.disabled);
    root.style.setProperty('--text-inverse', theme.text.inverse);
    
    root.style.setProperty('--border-light', theme.border.light);
    root.style.setProperty('--border-medium', theme.border.medium);
    root.style.setProperty('--border-strong', theme.border.strong);
    
    root.style.setProperty('--interactive-primary', theme.interactive.primary);
    root.style.setProperty('--interactive-primary-hover', theme.interactive.primaryHover);
    root.style.setProperty('--interactive-primary-active', theme.interactive.primaryActive);
    root.style.setProperty('--interactive-secondary', theme.interactive.secondary);
    root.style.setProperty('--interactive-secondary-hover', theme.interactive.secondaryHover);
    root.style.setProperty('--interactive-success', theme.interactive.success);
    root.style.setProperty('--interactive-warning', theme.interactive.warning);
    root.style.setProperty('--interactive-error', theme.interactive.error);
    
    // Apply shadow
    root.style.setProperty('--shadow-sm', theme.shadow.sm);
    root.style.setProperty('--shadow-base', theme.shadow.base);
    root.style.setProperty('--shadow-md', theme.shadow.md);
    root.style.setProperty('--shadow-lg', theme.shadow.lg);
    root.style.setProperty('--shadow-xl', theme.shadow.xl);
    
    // Apply tokens
    root.style.setProperty('--font-sans', fonts.sans);
    root.style.setProperty('--font-mono', fonts.mono);
    
    // Apply data attribute for CSS targeting
    root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Apply background color to body
    document.body.style.backgroundColor = theme.background.primary;
    document.body.style.color = theme.text.primary;
    document.body.style.fontFamily = fonts.sans;
    document.body.style.transition = 'background-color 200ms ease, color 200ms ease';
  }, [isDarkMode, theme]);

  const value = {
    theme,
    tokens,
    fonts,
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
