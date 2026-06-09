/**
 * BookCover — affiche la couverture d'un livre avec fallback couleur
 */
export default function BookCover({ cover, title, style = {} }) {
  // séparer objectPosition pour l'appliquer à l'image uniquement
  const { objectPosition, ...containerStyle } = style;

  return (
    <div
      style={{
        overflow: 'hidden',
        backgroundColor: '#E1F7F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}
      role="img"
      aria-label={title ? `Couverture de ${title}` : undefined}
    >
      <img
        src={cover}
        alt={title || ''}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: objectPosition || 'center', display: 'block' }}
        onError={e => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}