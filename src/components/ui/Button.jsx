/**
 * Button — base design system
 */
export default function Button({ variant = 'primary', size = 'md', onClick, children, style = {}, ...props }) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    whiteSpace: 'nowrap',
    borderRadius: '8px',
  }

  const sizeStyles = {
    sm: { height: '32px', padding: '0 12px', fontSize: '12px', gap: '6px' },
    md: { height: '40px', padding: '0 16px', fontSize: '14px', gap: '8px' },
    lg: { height: '48px', padding: '0 24px', fontSize: '16px', gap: '10px' },
  }

  const variantStyles = {
    primary: {
      backgroundColor: '#25706F',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'white',
      color: '#656366',
      border: '2px solid #CFCDD0',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#656366',
    },
  }

  return (
    <button
      onClick={onClick}
      style={{
        ...baseStyles,
        ...(sizeStyles[size] || sizeStyles.md),
        ...(variantStyles[variant] || variantStyles.primary),
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}