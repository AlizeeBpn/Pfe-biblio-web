/**
 * Badge — compact label for status / categorisation
 */

const sizes = {
  small: {
    height:       'var(--sz-2xs)',
    padding:      '0 var(--pad-2xs)',
    gap:          'var(--gap-2xs)',
    fontSize:     'var(--text-caption-sm)',
    borderRadius: 'var(--br-2xs)',
  },
  medium: {
    height:       'var(--sz-xs)',
    padding:      '0 var(--pad-xs)',
    gap:          'var(--gap-xs)',
    fontSize:     'var(--text-caption-sm)',
    borderRadius: 'var(--br-2xs)',
  },
  large: {
    height:       'var(--sz-sm)',
    padding:      '0 var(--pad-sm)',
    gap:          'var(--gap-sm)',
    fontSize:     'var(--text-caption-md)',
    borderRadius: 'var(--br-2xs)',
  },
}

const variants = {
  default: { bg: 'var(--secondary-3)', text: 'var(--secondary-12)' },
  success: { bg: 'var(--success-3)',   text: 'var(--success-12)'   },
  warning: { bg: 'var(--warning-3)',   text: 'var(--warning-12)'   },
  error:   { bg: 'var(--error-3)',     text: 'var(--error-12)'     },
  neutral: { bg: 'var(--neutral-3)',   text: 'var(--neutral-12)'   },
  info:    { bg: 'var(--info-3)',      text: 'var(--info-12)'      },
}

export const Badge = ({ children, size = 'medium', variant = 'default', icon, truncate = false }) => {
  const s = sizes[size]
  const v = variants[variant]

  return (
    <div
      className="inline-flex items-center shrink-0 font-sans font-semibold"
      style={{
        alignSelf:       'flex-start',
        height:          s.height,
        padding:         s.padding,
        gap:             s.gap,
        backgroundColor: v.bg,
        borderRadius:    s.borderRadius,
        fontSize:        s.fontSize,
        lineHeight:      1,
      }}
    >
      {icon && <span className="flex items-center shrink-0">{icon}</span>}
      <span style={{ color: v.text, whiteSpace: 'nowrap', lineHeight: 1 }}>
        {children}
      </span>
    </div>
  )
}

export default Badge
