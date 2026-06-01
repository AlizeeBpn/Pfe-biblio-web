/**
 * App.jsx — Bibliothèques de Bordeaux (version web standalone)
 *
 * Site web desktop-first responsive, SEO, design system complet.
 *
 * Sections :
 *   A) Header sticky (80px) — logo + recherche fixe + auth
 *   B) Navigation menu — Pratique, Catalogue, Patrimoine, Agenda, Services
 *   C) Hero (320px)
 *   D) Actualité — "À ne pas manquer"
 *   E) Accès rapides — grille 1×4
 *   F) Pour vous — book carousel
 *   G) Footer (200px)
 */

import { useState } from 'react'
import { motion }    from 'framer-motion'
import {
  IconBuildingBridge2,
  IconSearch,
  IconUser,
  IconArrowRight,
  IconCalendarEvent,
  IconInfoCircle,
  IconChevronRight,
  IconArchive,
  IconUserPlus,
  IconMenu2,
  IconX,
  IconLogout,
  IconSettings,
  IconMapPin,
  IconCalendarDue,
  IconDeviceMobile,
  IconTools,
} from '@tabler/icons-react'

import Badge from './components/ui/Badge'
import { BOOKS } from './data/books'

/* ─────────────────────────────────────────────────────────────
   SHADOWS
   ───────────────────────────────────────────────────────────── */
const SHADOW_HEADER =
  '0px 18px 7px 0px var(--alpha-grey-01), 0px 10px 6px 0px var(--alpha-grey-05), ' +
  '0px 4px 4px 0px var(--alpha-grey-09), 0px 1px 2px 0px var(--alpha-grey-10)'

const SHADOW_CARD =
  '0px 18px 7px 0px var(--alpha-grey-01), 0px 10px 6px 0px var(--alpha-grey-05), ' +
  '0px 4px 4px 0px var(--alpha-grey-09), 0px 1px 2px 0px var(--alpha-grey-10)'

const SHADOW_COVER =
  '0px 16px 9px 0px var(--alpha-grey-05), 0px 7px 7px 0px var(--alpha-grey-09), ' +
  '0px 2px 4px 0px var(--alpha-grey-10)'

/* ─────────────────────────────────────────────────────────────
   CONTAINER — max-width 1440px, padding horizontal adaptatif
   ───────────────────────────────────────────────────────────── */
function Container({ children, className = '', style = {} }) {
  return (
    <div
      className={`w-full mx-auto px-[var(--layout-3)] md:px-[var(--layout-6)] lg:px-[var(--layout-9)] xl:px-[var(--layout-10)] ${className}`}
      style={{ maxWidth: '1440px', ...style }}
    >
      {children}
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-brand)',
        fontWeight: 700,
        fontSize:   'var(--text-heading-sm)',
        lineHeight: 1.3,
        color:      'var(--color-text-brand)',
        margin:     0,
      }}
    >
      {children}
    </h2>
  )
}


/* ══════════════════════════════════════════════════════════════
   A) HEADER — sticky, 80px, logo + recherche fixe + auth
   ══════════════════════════════════════════════════════════════ */
function WebHeader({ isLoggedIn, onLogin, onLogout }) {
  const [query, setQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        height:          '80px',
        backgroundColor: 'var(--neutral-1)',
        borderBottom:    '1px solid var(--neutral-6)',
        boxShadow:       SHADOW_HEADER,
      }}
    >
      <Container className="h-full flex items-center gap-[var(--gap-2xl)]">

        {/* Logo */}
        <a
          href="#"
          aria-label="Bibliothèques de Bordeaux — accueil"
          className="flex items-center shrink-0 no-underline focus-visible:ring-2 focus-visible:ring-[var(--primary-9)] focus-visible:rounded"
          style={{ gap: 'var(--gap-2md)', textDecoration: 'none' }}
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width:           'var(--sz-lg)',
              height:          'var(--sz-lg)',
              backgroundColor: 'var(--secondary-4)',
              borderRadius:    'var(--br-round)',
              padding:         'var(--pad-sm)',
            }}
            aria-hidden="true"
          >
            <IconBuildingBridge2 size={22} strokeWidth={2} color="var(--secondary-11)" />
          </div>
          <span
            className="hidden sm:block"
            style={{
              fontFamily: 'var(--font-brand)',
              fontWeight: 700,
              fontSize:   'var(--text-body-lg)',
              lineHeight: 1.3,
              color:      'var(--color-text-brand)',
              whiteSpace: 'nowrap',
            }}
          >
            Bibliothèques de Bordeaux
          </span>
        </a>

        {/* Barre de recherche fixe */}
        <div className="flex-1 flex justify-center" style={{ maxWidth: '500px' }}>
          <div
            className="w-full flex items-center"
            style={{
              maxWidth:        '400px',
              height:          'var(--sz-xl)',
              backgroundColor: 'var(--neutral-2)',
              border:          '1.5px solid var(--neutral-6)',
              borderRadius:    'var(--br-round)',
              padding:         '0 var(--pad-2md)',
              gap:             'var(--gap-md)',
            }}
          >
            <IconSearch size={18} strokeWidth={2} color="var(--neutral-9)" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Chercher un livre…"
              aria-label="Chercher un livre"
              className="flex-1 bg-transparent outline-none border-none"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'var(--text-body-sm)',
                color:      'var(--color-text-body)',
              }}
            />
          </div>
        </div>

        {/* Actions droite */}
        <div className="flex items-center shrink-0" style={{ gap: 'var(--gap-2md)', marginLeft: 'auto' }}>
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-[var(--gap-md)] bg-transparent border-none cursor-pointer rounded-[var(--br-md)] px-[var(--pad-2md)] py-[var(--pad-xs)] hover:bg-[var(--neutral-3)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-9)]"
                style={{ color: 'var(--color-text-body)' }}
                aria-label="Menu utilisateur"
                aria-expanded={userMenuOpen}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width:           'var(--sz-md)',
                    height:          'var(--sz-md)',
                    backgroundColor: 'var(--primary-9)',
                  }}
                >
                  <IconUser size={16} strokeWidth={2.5} color="white" />
                </div>
                <span className="hidden sm:inline text-[var(--text-body-sm)] font-semibold">Mon espace</span>
                <IconChevronRight
                  size={14}
                  strokeWidth={2}
                  style={{ transform: userMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 150ms' }}
                />
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 z-50 min-w-[200px]"
                  style={{
                    top:             'calc(100% + 8px)',
                    backgroundColor: 'var(--neutral-1)',
                    border:          '1px solid var(--neutral-5)',
                    borderRadius:    'var(--br-md)',
                    boxShadow:       SHADOW_HEADER,
                    padding:         'var(--pad-xs) 0',
                  }}
                >
                  <a
                    href="#mon-espace"
                    className="flex items-center gap-[var(--gap-2md)] no-underline px-[var(--pad-lg)] py-[var(--pad-md)] hover:bg-[var(--neutral-3)] transition-colors"
                    style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-body)' }}
                  >
                    <IconUser size={18} strokeWidth={1.8} color="var(--primary-9)" />
                    Mon profil
                  </a>
                  <a
                    href="#parametres"
                    className="flex items-center gap-[var(--gap-2md)] no-underline px-[var(--pad-lg)] py-[var(--pad-md)] hover:bg-[var(--neutral-3)] transition-colors"
                    style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-body)' }}
                  >
                    <IconSettings size={18} strokeWidth={1.8} color="var(--neutral-9)" />
                    Paramètres
                  </a>
                  <div style={{ height: '1px', backgroundColor: 'var(--neutral-5)', margin: 'var(--pad-xs) 0' }} />
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-[var(--gap-2md)] w-full bg-transparent border-none cursor-pointer px-[var(--pad-lg)] py-[var(--pad-md)] hover:bg-[var(--neutral-3)] transition-colors"
                    style={{ fontSize: 'var(--text-body-sm)', color: 'var(--error-11)', textAlign: 'left' }}
                  >
                    <IconLogout size={18} strokeWidth={1.8} />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={onLogin}
                className="inline-flex items-center justify-center font-bold select-none cursor-pointer transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-9)] focus-visible:ring-offset-2"
                style={{
                  height:          'var(--sz-lg)',
                  padding:         '0 var(--pad-2md)',
                  gap:             'var(--gap-sm)',
                  fontSize:        'var(--text-body-sm)',
                  borderRadius:    'var(--br-sm)',
                  backgroundColor: 'var(--primary-10)',
                  color:           'white',
                  border:          'none',
                  boxShadow:       '0 -2px 10px 0 var(--alpha-primary-08), 0 2px 10px 0 var(--alpha-primary-08)',
                }}
              >
                <IconUserPlus size={16} strokeWidth={2} />
                <span className="hidden md:inline">Inscription</span>
              </button>
              <button
                onClick={onLogin}
                className="inline-flex items-center justify-center font-semibold select-none cursor-pointer transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-9)] focus-visible:ring-offset-2"
                style={{
                  height:          'var(--sz-lg)',
                  padding:         '0 var(--pad-2md)',
                  gap:             'var(--gap-sm)',
                  fontSize:        'var(--text-body-sm)',
                  borderRadius:    'var(--br-sm)',
                  backgroundColor: 'var(--neutral-1)',
                  color:           'var(--neutral-11)',
                  border:          '2px solid var(--neutral-7)',
                }}
              >
                <IconUser size={16} strokeWidth={2} />
                <span className="hidden md:inline">Connexion</span>
              </button>
            </>
          )}
        </div>

      </Container>
    </header>
  )
}


/* ══════════════════════════════════════════════════════════════
   B) NAVIGATION MENU — 5 onglets : Pratique, Catalogue, Patrimoine, Agenda, Services
   ══════════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { label: 'Pratique',   href: '#pratique',   icon: IconInfoCircle     },
  { label: 'Catalogue',  href: '#catalogue',  icon: IconSearch         },
  { label: 'Patrimoine', href: '#patrimoine', icon: IconArchive        },
  { label: 'Agenda',     href: '#agenda',     icon: IconCalendarEvent  },
  { label: 'Services',   href: '#services',   icon: IconTools          },
]

function WebNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <nav
      className="w-full sticky top-[80px] z-40"
      style={{
        backgroundColor: 'var(--primary-12)',
        borderBottom:    '1px solid var(--primary-11)',
      }}
      aria-label="Navigation principale"
    >
      <Container className="relative">
        {/* Desktop */}
        <ul className="hidden lg:flex items-center list-none m-0 p-0" style={{ gap: 'var(--gap-none)', height: '52px' }}>
          {NAV_ITEMS.map((item, i) => (
            <li key={item.href} className="relative h-full">
              <a
                href={item.href}
                onClick={e => { e.preventDefault(); setActiveIndex(i) }}
                className="flex items-center no-underline h-full px-[var(--pad-lg)] transition-colors duration-150 focus:outline-none focus-visible:bg-[var(--primary-10)] focus-visible:text-white"
                style={{
                  gap:          'var(--gap-2md)',
                  fontSize:     'var(--text-body-sm)',
                  fontWeight:   activeIndex === i ? 700 : 500,
                  color:        activeIndex === i ? 'var(--color-white)' : 'rgba(255,255,255,0.75)',
                  borderBottom: activeIndex === i ? '3px solid var(--secondary-8)' : '3px solid transparent',
                  whiteSpace:   'nowrap',
                  transition:   'color 150ms, border-color 150ms',
                }}
                aria-current={activeIndex === i ? 'page' : undefined}
              >
                <item.icon size={18} strokeWidth={activeIndex === i ? 2.5 : 1.8} aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <div className="flex lg:hidden items-center justify-between" style={{ height: '48px' }}>
          <span
            style={{
              fontFamily: 'var(--font-brand)',
              fontSize:   'var(--text-body-md)',
              fontWeight: 700,
              color:      'var(--color-white)',
            }}
          >
            {NAV_ITEMS[activeIndex]?.label || 'Navigation'}
          </span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center bg-transparent border-none cursor-pointer"
            style={{ color: 'var(--color-white)', padding: 'var(--pad-sm)' }}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            className="lg:hidden absolute left-0 right-0 z-50"
            style={{
              top:             '100%',
              backgroundColor: 'var(--primary-12)',
              borderTop:       '1px solid var(--primary-11)',
              boxShadow:       SHADOW_HEADER,
            }}
          >
            <ul className="list-none m-0 p-0 py-[var(--pad-2md)]">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={e => { e.preventDefault(); setActiveIndex(i); setMobileOpen(false) }}
                    className="flex items-center no-underline w-full transition-colors duration-150 focus:outline-none focus-visible:bg-[var(--primary-10)]"
                    style={{
                      gap:             'var(--gap-2md)',
                      padding:         'var(--pad-md) var(--pad-lg)',
                      fontSize:        'var(--text-body-md)',
                      fontWeight:      activeIndex === i ? 700 : 500,
                      color:           activeIndex === i ? 'var(--color-white)' : 'rgba(255,255,255,0.75)',
                      backgroundColor: activeIndex === i ? 'var(--primary-10)' : 'transparent',
                    }}
                    aria-current={activeIndex === i ? 'page' : undefined}
                  >
                    <item.icon size={20} strokeWidth={activeIndex === i ? 2.5 : 1.8} aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </nav>
  )
}


/* ══════════════════════════════════════════════════════════════
   C) HERO — 320px, fond primary-12, texte blanc
   ══════════════════════════════════════════════════════════════ */
function WebHero() {
  return (
    <section
      className="w-full flex items-center"
      style={{
        minHeight:       '320px',
        backgroundColor: 'var(--primary-12)',
        padding:         'var(--layout-7) 0',
      }}
    >
      <Container className="flex flex-col" style={{ gap: 'var(--layout-3)' }}>
        <h1
          style={{
            fontFamily: 'var(--font-brand)',
            fontWeight: 700,
            fontSize:   'var(--text-heading-lg)',
            lineHeight: 1.25,
            color:      'var(--color-white)',
            margin:     0,
            maxWidth:   '680px',
          }}
        >
          Explorez, découvrez,<br />
          vivez la culture
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-body-lg)',
            fontWeight: 400,
            lineHeight: 1.5,
            color:      'rgba(255,255,255,0.9)',
            margin:     0,
            maxWidth:   '560px',
          }}
        >
          Accédez à 1,3 million de documents et participez
          à la vie culturelle du réseau des Bibliothèques de Bordeaux.
        </p>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   D) ACTUALITÉ — "À ne pas manquer"
   ══════════════════════════════════════════════════════════════ */
function WebNewsSection() {
  return (
    <section className="w-full" style={{ padding: 'var(--layout-7) 0', backgroundColor: 'var(--neutral-1)' }}>
      <Container className="flex flex-col" style={{ gap: 'var(--layout-3)' }}>
        <SectionTitle>À ne pas manquer</SectionTitle>

        <motion.a
          href="#evenement-dicker"
          whileHover={{ y: -3, boxShadow: SHADOW_CARD }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="flex overflow-hidden no-underline focus:outline-none focus-visible:ring-2"
          style={{
            backgroundColor: 'var(--neutral-1)',
            border:          '1px solid var(--neutral-3)',
            borderRadius:    'var(--br-lg)',
            boxShadow:       SHADOW_CARD,
            textDecoration:  'none',
            maxWidth:        '900px',
          }}
          aria-label="Rencontre avec Joël Dicker — En savoir plus"
        >
          <div
            className="shrink-0 hidden sm:block"
            style={{
              width:           '300px',
              minHeight:       '240px',
              backgroundColor: 'var(--secondary-4)',
              position:        'relative',
              overflow:        'hidden',
            }}
            aria-hidden="true"
          >
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(135deg, var(--secondary-4) 0%, var(--secondary-5) 100%)' }} />
          </div>

          <div className="flex flex-col justify-center" style={{ padding: 'var(--pad-2md) var(--layout-5)', gap: 'var(--gap-lg)', flex: 1 }}>
            <Badge variant="default" size="large">Exposition • Mériadeck</Badge>
            <h3 style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: 'var(--text-heading-sm)', lineHeight: 1.3, color: 'var(--color-text-title)', margin: 0 }}>
              Rencontre avec Joël Dicker
            </h3>
            <p style={{ fontSize: 'var(--text-body-md)', fontWeight: 400, lineHeight: 1.5, color: 'var(--color-text-body)', margin: 0 }}>
              L'auteur sera à Bordeaux le 15 mars pour dédicaces et une rencontre ouverte au public à la Bibliothèque Mériadeck.
            </p>
            <a
              href="#evenement-dicker"
              className="inline-flex items-center focus:outline-none focus-visible:underline"
              style={{ gap: 'var(--gap-xs)', fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--primary-11)', textDecoration: 'none' }}
            >
              En savoir plus
              <IconArrowRight size={16} strokeWidth={2} />
            </a>
          </div>
        </motion.a>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   E) ACCÈS RAPIDES — grille 4 colonnes, icônes SVG Teal
   ══════════════════════════════════════════════════════════════ */
const QUICK_ACCESS_ITEMS = [
  { title: 'Rechercher',           desc: 'Catalogue en ligne',    href: '#catalogue',  icon: <IconSearch size={44} strokeWidth={1.5} color="var(--primary-8)" /> },
  { title: 'Événements',           desc: 'Agenda culturel',       href: '#evenements', icon: <IconCalendarDue size={44} strokeWidth={1.5} color="var(--primary-8)" /> },
  { title: 'Ressources numériques', desc: 'Lire, écouter, voir',  href: '#numerique',  icon: <IconDeviceMobile size={44} strokeWidth={1.5} color="var(--primary-8)" /> },
  { title: 'Infos pratiques',      desc: 'Horaires & accès',      href: '#infos',      icon: <IconMapPin size={44} strokeWidth={1.5} color="var(--primary-8)" /> },
]

function QuickAccessCard({ icon, title, desc, href }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="flex flex-col items-center justify-center no-underline focus:outline-none focus-visible:ring-2"
      style={{
        height:          '220px',
        backgroundColor: 'var(--neutral-1)',
        border:          '1px solid var(--neutral-3)',
        borderRadius:    'var(--br-lg)',
        boxShadow:       SHADOW_CARD,
        textDecoration:  'none',
        cursor:          'pointer',
        gap:             'var(--gap-lg)',
        padding:         'var(--pad-2md)',
      }}
      aria-label={title}
    >
      <span aria-hidden="true" className="flex items-center justify-center" style={{ width: '52px', height: '52px' }}>
        {icon}
      </span>
      <div className="flex flex-col items-center" style={{ gap: 'var(--gap-xs)' }}>
        <p style={{ fontSize: 'var(--text-body-md)', fontWeight: 600, lineHeight: 1.4, color: 'var(--color-text-title)', margin: 0, textAlign: 'center' }}>
          {title}
        </p>
        <p style={{ fontSize: 'var(--text-body-sm)', fontWeight: 400, lineHeight: 1.4, color: 'var(--color-text-subtle)', margin: 0, textAlign: 'center' }}>
          {desc}
        </p>
      </div>
      <IconChevronRight size={18} strokeWidth={2} color="var(--neutral-9)" aria-hidden="true" />
    </motion.a>
  )
}

function WebQuickAccessSection() {
  return (
    <section className="w-full" style={{ padding: 'var(--layout-7) 0', backgroundColor: 'var(--neutral-2)' }}>
      <Container className="flex flex-col" style={{ gap: 'var(--layout-3)' }}>
        <SectionTitle>Accès rapides</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--gap-lg)' }}>
          {QUICK_ACCESS_ITEMS.map(item => (
            <QuickAccessCard key={item.href} {...item} />
          ))}
        </div>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   F) POUR VOUS — carrousel horizontal de livres
   ══════════════════════════════════════════════════════════════ */
const RECOMMENDED_BOOKS = BOOKS

const BOOK_COVER_COLORS = [
  'var(--secondary-4)', 'var(--primary-4)', 'var(--info-3)',
  'var(--warning-3)',   'var(--success-3)', 'var(--secondary-3)',
  'var(--primary-3)',   'var(--success-4)',
]

function WebRecommendationsSection() {
  return (
    <section className="w-full" style={{ padding: 'var(--layout-7) 0', backgroundColor: 'var(--neutral-1)' }}>
      <Container className="flex flex-col" style={{ gap: 'var(--layout-3)' }}>
        <SectionTitle>Pour vous — nos suggestions</SectionTitle>

        <div
          className="flex overflow-x-auto"
          style={{ gap: 'var(--gap-lg)', paddingBottom: 'var(--pad-md)', scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          role="list"
          aria-label="Suggestions de livres"
        >
          {RECOMMENDED_BOOKS.map((book, i) => (
            <motion.div
              key={book.id}
              role="listitem"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="flex flex-col shrink-0 cursor-pointer focus:outline-none"
              tabIndex={0}
              aria-label={`${book.title} par ${book.author}`}
              style={{
                width:           '220px',
                backgroundColor: 'var(--neutral-1)',
                border:          '1px solid var(--neutral-3)',
                borderRadius:    'var(--br-lg)',
                boxShadow:       SHADOW_CARD,
                overflow:        'hidden',
              }}
            >
              <div style={{ height: '160px', backgroundColor: BOOK_COVER_COLORS[i % BOOK_COVER_COLORS.length], overflow: 'hidden', flexShrink: 0, boxShadow: SHADOW_COVER }}>
                <img src={book.cover} alt={book.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => { e.currentTarget.style.display = 'none' }} />
              </div>
              <div className="flex flex-col" style={{ padding: 'var(--pad-md)', gap: 'var(--gap-2md)', flex: 1 }}>
                <p style={{ fontSize: 'var(--text-body-sm)', fontWeight: 700, lineHeight: 1.4, color: 'var(--color-text-title)', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {book.title}
                </p>
                <p style={{ fontSize: 'var(--text-caption-sm)', fontWeight: 500, color: 'var(--color-text-subtle)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {book.author}
                </p>
                {book.genres && (
                  <div className="flex flex-wrap" style={{ gap: 'var(--gap-2xs)' }}>
                    {book.genres.slice(0, 3).map(g => (
                      <span
                        key={g}
                        style={{
                          fontSize:        '10px',
                          fontWeight:      600,
                          padding:         '2px 6px',
                          borderRadius:    'var(--br-2xs)',
                          backgroundColor: 'var(--primary-3)',
                          color:           'var(--primary-11)',
                          whiteSpace:      'nowrap',
                          lineHeight:      1.2,
                        }}
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   G) FOOTER
   ══════════════════════════════════════════════════════════════ */
const FOOTER_LINKS = [
  { label: 'Horaires',              href: '#horaires'         },
  { label: 'Nous rejoindre',        href: '#rejoindre'        },
  { label: 'Contact',               href: '#contact'          },
  { label: 'Espace professionnels', href: '#espace-pros'      },
  { label: 'Plan du site',          href: '#plan-du-site'     },
  { label: 'Mentions légales',      href: '#mentions-legales' },
  { label: 'Accessibilité',         href: '#accessibilite'    },
]

function WebFooter() {
  return (
    <footer className="w-full" style={{ backgroundColor: 'var(--neutral-2)', borderTop: '1px solid var(--neutral-6)', minHeight: '200px', padding: 'var(--layout-6) 0' }}>
      <Container className="flex flex-col" style={{ gap: 'var(--layout-3)' }}>
        <div className="flex items-center" style={{ gap: 'var(--gap-2md)' }}>
          <div className="flex items-center justify-center shrink-0" style={{ width: '36px', height: '36px', backgroundColor: 'var(--secondary-4)', borderRadius: 'var(--br-round)', padding: '7px' }}>
            <IconBuildingBridge2 size={20} strokeWidth={2} color="var(--secondary-11)" />
          </div>
          <span style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: 'var(--text-body-md)', color: 'var(--color-text-brand)' }}>
            Bibliothèques de Bordeaux
          </span>
        </div>

        <nav aria-label="Navigation secondaire">
          <ul className="flex flex-wrap list-none m-0 p-0" style={{ gap: 'var(--gap-2xl)' }}>
            {FOOTER_LINKS.map(link => (
              <li key={link.href}>
                <a href={link.href} className="no-underline hover:underline focus:outline-none focus-visible:underline"
                  style={{ fontSize: 'var(--text-body-sm)', fontWeight: 500, color: 'var(--color-text-body)' }}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ height: '1px', backgroundColor: 'var(--neutral-6)' }} aria-hidden="true" />

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-caption-sm)', fontWeight: 400, lineHeight: 1.5, color: 'var(--color-text-subtle)', margin: 0 }}>
          © 2026 Bibliothèques de Bordeaux&nbsp;•&nbsp;Horaires : Lun-Ven 12h–20h, Sam 10h–18h
        </p>
      </Container>
    </footer>
  )
}


/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT — App
   ══════════════════════════════════════════════════════════════ */
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  return (
    <div className="min-h-screen w-full" style={{ fontFamily: 'var(--font-body)', backgroundColor: 'var(--neutral-2)', color: 'var(--color-text-body)' }}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded focus:bg-[var(--primary-10)] focus:text-white focus:font-bold focus:no-underline">
        Aller au contenu
      </a>

      <WebHeader isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      <WebNav />

      <main id="main-content">
        <WebHero />
        <WebNewsSection />
        <WebQuickAccessSection />
        <WebRecommendationsSection />
      </main>

      <WebFooter />
    </div>
  )
}
