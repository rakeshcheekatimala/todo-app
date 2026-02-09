// Mainline-inspired color palette
export const colors = {
  // Primary Slate/Neutral tones
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  
  // Accent Blue
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  
  // Success Green
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  
  // Warning Amber
  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  
  // Error Red
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  
  // Neutral grays
  gray: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
  },
  
  // Pure colors
  white: '#FFFFFF',
  black: '#000000',
};

// Theme-specific color assignments
export const lightTheme = {
  // Backgrounds
  background: {
    primary: colors.slate[50],
    secondary: colors.white,
    tertiary: colors.slate[100],
    elevated: colors.white,
  },
  
  // Text
  text: {
    primary: colors.slate[900],
    secondary: colors.slate[600],
    tertiary: colors.slate[500],
    disabled: colors.slate[400],
    inverse: colors.white,
  },
  
  // Borders
  border: {
    light: colors.slate[200],
    medium: colors.slate[300],
    strong: colors.slate[400],
  },
  
  // Interactive
  interactive: {
    primary: colors.blue[500],
    primaryHover: colors.blue[600],
    primaryActive: colors.blue[700],
    secondary: colors.slate[700],
    secondaryHover: colors.slate[800],
    success: colors.green[500],
    warning: colors.amber[500],
    error: colors.red[500],
  },
  
  // Shadows
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

export const darkTheme = {
  // Backgrounds
  background: {
    primary: colors.slate[900],
    secondary: colors.slate[800],
    tertiary: colors.slate[700],
    elevated: colors.slate[800],
  },
  
  // Text
  text: {
    primary: colors.slate[100],
    secondary: colors.slate[300],
    tertiary: colors.slate[400],
    disabled: colors.slate[500],
    inverse: colors.slate[900],
  },
  
  // Borders
  border: {
    light: colors.slate[700],
    medium: colors.slate[600],
    strong: colors.slate[500],
  },
  
  // Interactive
  interactive: {
    primary: colors.blue[400],
    primaryHover: colors.blue[500],
    primaryActive: colors.blue[600],
    secondary: colors.slate[300],
    secondaryHover: colors.slate[200],
    success: colors.green[500],
    warning: colors.amber[500],
    error: colors.red[500],
  },
  
  // Shadows
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
  },
};
