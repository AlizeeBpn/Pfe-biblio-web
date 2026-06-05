/**
 * App.jsx — Bibliothèques de Bordeaux
 * Design fidèle à la maquette Figma "design-system neutral" (1920w light).
 * Sections : Header, Nav, Hero, Accès rapides, Recommandé par les lecteurs + Catégories,
 *            À ne pas manquer, L'agenda du réseaux, Découvrir le patrimoine, Footer.
 */

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  IconSearch,
  IconUser,
  IconArrowRight,
  IconChevronRight,
  IconUserPlus,
  IconMenu2,
  IconX,
  IconLogout,
  IconSettings,
  IconMessageChatbot,
  IconEye,
  IconBuildingStore,
  IconBook,
  IconCalendarEvent,
  IconChevronLeft,
  IconStar,
  IconArrowNarrowRight,
} from '@tabler/icons-react'

import Badge from './components/ui/Badge'
import { BOOKS } from './data/books'

/* ─────────────────────────────────────────────────────────────
   SHADOWS — exacts depuis Figma
   ───────────────────────────────────────────────────────────── */
const SHADOW_HEADER =
  '0px 18px 7px 0px rgba(142,141,143,0.01), 0px 10px 6px 0px rgba(142,141,143,0.05), ' +
  '0px 4px 4px 0px rgba(142,141,143,0.09), 0px 1px 2px 0px rgba(142,141,143,0.10)'

const SHADOW_CARD =
  '0px 18px 7px 0px rgba(142,141,143,0.01), 0px 10px 6px 0px rgba(142,141,143,0.05), ' +
  '0px 4px 4px 0px rgba(142,141,143,0.09), 0px 1px 2px 0px rgba(142,141,143,0.10)'

const SHADOW_COVER =
  '0px -1px 2px 0px rgba(142,141,143,0.10), 0px -3px 3px 0px rgba(142,141,143,0.09), ' +
  '0px -6px 4px 0px rgba(142,141,143,0.05), 0px -11px 4px 0px rgba(142,141,143,0.01), ' +
  '0px 2px 4px 0px rgba(142,141,143,0.10), 0px 7px 7px 0px rgba(142,141,143,0.09), ' +
  '0px 16px 9px 0px rgba(142,141,143,0.05)'

const SHADOW_NAV =
  '0px 2px 10px 0px rgba(99,181,180,0.08), 0px -2px 10px 0px rgba(99,181,180,0.08)'

/* ─────────────────────────────────────────────────────────────
   CONTAINER — gestion du layout (padding 320px par défaut)
   ───────────────────────────────────────────────────────────── */
function Container({ children, className = '', style = {} }) {
  return (
    <div
      className={`w-full mx-auto px-4 md:px-8 max-w-[1280px] ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

function SectionTitle({ children, style = {} }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-brand)',
        fontWeight: 700,
        fontSize:   '24px',
        lineHeight: '31.2px',
        color:      '#204140',
        margin:     0,
        ...style,
      }}
    >
      {children}
    </h2>
  )
}


/* ══════════════════════════════════════════════════════════════
   A) HEADER — sticky 80px (layout: gap 266px, padding 16px 21px 16px 320px)
   ══════════════════════════════════════════════════════════════ */
function WebHeader({ isLoggedIn, onLogin, onLogout }) {
  const [query, setQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        height:          '80px',
        backgroundColor: 'white',
        borderBottom:    '1px solid var(--neutral-6, #F1F0F1)',
        boxShadow:       SHADOW_HEADER,
      }}
    >
      <div className="h-full flex items-center justify-between w-full mx-auto px-4 md:px-8 max-w-[1280px] gap-4">
        {/* Logo */}
        <a
          href="#"
          aria-label="Bibliothèques de Bordeaux — accueil"
          className="flex items-center shrink-0 no-underline focus-visible:ring-2 focus-visible:ring-[var(--primary-9)] focus-visible:rounded"
          style={{ gap: '12px', height: '40px' }}
        >
          <div className="shrink-0 flex items-center justify-center" style={{ width: '40px', height: '40px' }}>
            <img
              src="/images/logo-icon.svg"
              alt=""
              aria-hidden="true"
              width={40}
              height={40}
              style={{ display: 'block' }}
            />
          </div>
          <span
            className="hidden sm:block"
            style={{
              fontFamily: 'var(--font-brand)',
              fontWeight: 700,
              fontSize:   '20px',
              lineHeight: '26px',
              color:      '#204140',
              whiteSpace: 'nowrap',
            }}
          >
            Bibliothèques de Bordeaux
          </span>
        </a>

        {/* Barre de recherche */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div
            className="flex items-center w-full max-w-[353px]"
            style={{
              height: '48px',
              backgroundColor: 'white',
              border: '1px solid #DAD9DB',
              borderRadius: '9999px',
              padding: '0 16px',
              gap: '8px',
              boxShadow: SHADOW_HEADER,
            }}
          >
            <IconSearch size={18} strokeWidth={2} color="#8E8D8F" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Chercher un livre…"
              aria-label="Chercher un livre"
              className="flex-1 bg-transparent outline-none border-none"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '14px',
                color:      '#222123',
              }}
            />
          </div>
        </div>

        {/* Bouton Accessibilité */}
        <button
          className="inline-flex items-center justify-center shrink-0 font-semibold select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-9)]"
          aria-label="Options d'accessibilité"
          style={{
            height:          '40px',
            width:           '40px',
            borderRadius:    '8px',
            backgroundColor: '#F4D2DE',
            color:           '#4D0F26',
            border:          '1px solid #E8BCC8',
          }}
        >
          <IconEye size={18} strokeWidth={2} />
        </button>

        {/* Auth buttons */}
        <div className="flex items-center shrink-0" style={{ gap: '12px' }}>
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-[8px] bg-transparent border-none cursor-pointer rounded-[10px] px-[16px] py-[6px] hover:bg-[var(--neutral-3)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-9)]"
                style={{ color: 'var(--color-text-body)' }}
                aria-label="Menu utilisateur"
                aria-expanded={userMenuOpen}
              >
                <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary-9)' }}>
                  <IconUser size={16} strokeWidth={2.5} color="white" />
                </div>
                <span className="hidden sm:inline" style={{ fontSize: '14px', fontWeight: 600 }}>Mon espace</span>
                <IconChevronRight size={14} strokeWidth={2} style={{ transform: userMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 150ms' }} />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 z-50 min-w-[200px]" style={{ top: 'calc(100% + 8px)', backgroundColor: 'white', border: '1px solid #E1E0E3', borderRadius: '10px', boxShadow: SHADOW_HEADER, padding: '6px 0' }}>
                  <a href="#mon-espace" className="flex items-center gap-[12px] no-underline px-[20px] py-[12px] hover:bg-[var(--neutral-3)] transition-colors" style={{ fontSize: '14px', color: '#656366' }}>
                    <IconUser size={18} strokeWidth={1.8} color="#357E7D" />
                    Mon profil
                  </a>
                  <a href="#parametres" className="flex items-center gap-[12px] no-underline px-[20px] py-[12px] hover:bg-[var(--neutral-3)] transition-colors" style={{ fontSize: '14px', color: '#656366' }}>
                    <IconSettings size={18} strokeWidth={1.8} color="#8E8D8F" />
                    Paramètres
                  </a>
                  <div style={{ height: '1px', backgroundColor: '#E1E0E3', margin: '6px 0' }} />
                  <button onClick={onLogout} className="flex items-center gap-[12px] w-full bg-transparent border-none cursor-pointer px-[20px] py-[12px] hover:bg-[var(--neutral-3)] transition-colors" style={{ fontSize: '14px', color: '#C53B40', textAlign: 'left' }}>
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
                className="inline-flex items-center justify-center font-bold select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-9)] focus-visible:ring-offset-2"
                style={{
                  height:          '40px',
                  padding:         '0 16px',
                  gap:             '6px',
                  fontSize:        '14px',
                  borderRadius:    '8px',
                  backgroundColor: '#25706F',
                  color:           'white',
                  border:          'none',
                  boxShadow:       SHADOW_NAV,
                  whiteSpace:      'nowrap',
                }}
              >
                <IconUserPlus size={16} strokeWidth={2} />
                <span className="hidden lg:inline">Inscription</span>
              </button>
              <button
                onClick={onLogin}
                className="inline-flex items-center justify-center font-semibold select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-9)] focus-visible:ring-offset-2"
                style={{
                  height:          '40px',
                  padding:         '0 16px',
                  gap:             '6px',
                  fontSize:        '14px',
                  borderRadius:    '8px',
                  backgroundColor: 'white',
                  color:           '#656366',
                  border:          '2px solid #CFCDD0',
                  whiteSpace:      'nowrap',
                }}
              >
                <IconUser size={16} strokeWidth={2} />
                <span className="hidden lg:inline">Connexion</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}


/* ══════════════════════════════════════════════════════════════
   B) NAV — 6 onglets, SVG icons
   ══════════════════════════════════════════════════════════════ */
function NavIcon({ src, label }) {
  return <img src={src} alt="" aria-hidden="true" width={20} height={20} style={{ display: 'block' }} />
}

const NAV_ITEMS = [
  { label: 'Accueil',    href: '#accueil',    icon: '/images/icon-home.svg'     },
  { label: 'Pratique',   href: '#pratique',   icon: '/images/icon-hands.svg'    },
  { label: 'Catalogue',  href: '#catalogue',  icon: '/images/icon-search2.svg'  },
  { label: 'Patrimoine', href: '#patrimoine', icon: '/images/icon-archive.svg'  },
  { label: 'Agenda',     href: '#agenda',     icon: '/images/icon-calendar.svg' },
  { label: 'Services',   href: '#services',   icon: '/images/icon-services.svg' },
]

function WebNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <nav
      className="w-full sticky top-[80px] z-40"
      style={{
        backgroundColor: '#204140',
        borderBottom:    '1px solid #297473',
        boxShadow:       SHADOW_NAV,
      }}
      aria-label="Navigation principale"
    >
      <Container className="relative">
        {/* Desktop */}
        <ul className="hidden lg:flex items-center list-none m-0 p-0" style={{ height: '52px' }}>
          {NAV_ITEMS.map((item, i) => (
            <li key={item.href} className="relative h-full">
              <a
                href={item.href}
                onClick={e => { e.preventDefault(); setActiveIndex(i) }}
                className="flex items-center no-underline h-full focus:outline-none focus-visible:bg-[#297473] focus-visible:text-white"
                style={{
                  gap:          '12px',
                  padding:      '14px 20px',
                  fontSize:     '14px',
                  fontWeight:   activeIndex === i ? 700 : 500,
                  color:        activeIndex === i ? 'white' : 'rgba(255,255,255,0.75)',
                  borderBottom: activeIndex === i ? '3px solid #CC668B' : '3px solid transparent',
                  whiteSpace:   'nowrap',
                  transition:   'color 150ms, border-color 150ms',
                }}
                aria-current={activeIndex === i ? 'page' : undefined}
              >
                <NavIcon src={item.icon} label={item.label} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <div className="flex lg:hidden items-center justify-between" style={{ height: '48px' }}>
          <span style={{ fontFamily: 'var(--font-brand)', fontSize: '16px', fontWeight: 700, color: 'white' }}>
            {NAV_ITEMS[activeIndex]?.label || 'Navigation'}
          </span>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="flex items-center justify-center bg-transparent border-none cursor-pointer" style={{ color: 'white', padding: '8px' }} aria-label={mobileOpen ? 'Fermer' : 'Ouvrir'}>
            {mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="lg:hidden absolute left-0 right-0 z-50" style={{ top: '100%', backgroundColor: '#204140', borderTop: '1px solid #297473', boxShadow: SHADOW_HEADER }}>
            <ul className="list-none m-0 p-0 py-[16px]">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={e => { e.preventDefault(); setActiveIndex(i); setMobileOpen(false) }}
                    className="flex items-center no-underline w-full transition-colors duration-150 focus:outline-none focus-visible:bg-[#297473]"
                    style={{ gap: '12px', padding: '12px 20px', fontSize: '16px', fontWeight: activeIndex === i ? 700 : 500, color: activeIndex === i ? 'white' : 'rgba(255,255,255,0.75)', backgroundColor: activeIndex === i ? '#297473' : 'transparent' }}
                    aria-current={activeIndex === i ? 'page' : undefined}
                  >
                    <NavIcon src={item.icon} label={item.label} />
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
   C) HERO — 400px, fond gradient + image (padding: 77px 320px)
   Repris fidèlement depuis Figma node 854:7880
   ══════════════════════════════════════════════════════════════ */
function WebHero() {
  return (
    <section
      className="w-full flex items-center"
      style={{
        height:        '400px',
        position:      'relative',
        overflow:      'hidden',
      }}
    >
      {/* Fond : image */}
      <div
        style={{
          position: 'absolute',
          inset:     0,
          zIndex:    1,
        }}
      >
        <img
          src="/images/bibliotheque-meriadeck-modernisation-600ea42d10895907865413%20(1).jpg"
          alt=""
          aria-hidden="true"
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            display:    'block',
          }}
        />
      </div>
      {/* Overlay : gradient 131deg */}
      <div
        style={{
          position:   'absolute',
          inset:       0,
          zIndex:      2,
          background: 'linear-gradient(131deg, rgba(32,65,64,1) 0%, rgba(37,112,111,0.2) 100%)',
        }}
      />
      {/* Contenu */}
      <div
        className="relative z-[3] w-full"
        style={{ padding: '77px 0' }}
      >
        <Container>
          <div className="flex flex-col" style={{ gap: '26px' }}>
            <h1
              style={{
                fontFamily:  'var(--font-brand)',
                fontWeight:  700,
                fontSize:    '32px',
                lineHeight:  '40px',
                color:       '#FFFFFF',
                margin:       0,
                maxWidth:    '314.61px',
              }}
            >
              Explorez, découvrez,<br />
              vivez la culture
            </h1>
            <p
              style={{
                fontFamily:  'var(--font-body)',
                fontSize:    '20px',
                fontWeight:  400,
                lineHeight:  '30px',
                color:       'rgba(255,255,255,0.9)',
                margin:       0,
                maxWidth:    '520.47px',
              }}
            >
              Accédez à 1,3 million de documents et participez à la vie<br />
              culturelle du réseau des Bibliothèques de Bordeaux.
            </p>
          </div>
        </Container>
      </div>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   D) ACCÈS RAPIDES — 4 colonnes (cards avec icônes, titre, desc, CTA)
   padding: 48px 320px, height: 371.19px
   ══════════════════════════════════════════════════════════════ */

const quickAccessData = [
  {
    title: 'Contact',
    desc: 'Discussion en ligne ou réservation de communication sur place',
    cta: 'Entrez en contact',
    icon: IconMessageChatbot,
    iconBg: '#E1F7F6',
    iconColor: '#297473',
  },
  {
    title: 'Bibliothèque accessible',
    desc: 'Des besoins etc',
    cta: 'Me renseigner',
    icon: IconEye,
    iconBg: '#E1F7F6',
    iconColor: '#297473',
  },
  {
    title: 'Bibliothèque Mériadeck',
    desc: 'Ouvert · Ferme à 20h00\n85 Cr Maréchal Juin, 33000 Bordeaux',
    cta: 'Voir plus de bibliothèques',
    icon: IconBuildingStore,
    iconBg: '#F4D2DE',
    iconColor: '#4D0F26',
  },
  {
    title: 'Ressources numériques',
    desc: 'Lire, écouter, voir',
    cta: 'Voir plus de bibliothèques',
    icon: IconBook,
    iconBg: '#E1F7F6',
    iconColor: '#297473',
  },
]

function QuickAccessCard({ icon: Icon, title, desc, cta, iconBg, iconColor }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="flex flex-col items-center no-underline w-full h-full"
      style={{
        backgroundColor: '#FCFCFD',
        border:          '1px solid #F1F0F1',
        borderRadius:    '14px',
        boxShadow:       SHADOW_CARD,
        padding:         '24px',
        gap:             '20px',
        flex:            1,
      }}
    >
      {/* Icon + Title + Description */}
      <div className="flex flex-col items-center" style={{ gap: '12px', flex: 1 }}>
        <span
          aria-hidden="true"
          className="flex items-center justify-center"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '9999px',
            backgroundColor: iconBg,
          }}
        >
          <Icon size={28} strokeWidth={1.8} color={iconColor} />
        </span>
        <div className="flex flex-col items-center" style={{ gap: '6px' }}>
          <p style={{ fontSize: '16px', fontWeight: 600, lineHeight: '22.4px', color: '#222123', margin: 0, textAlign: 'center' }}>
            {title}
          </p>
          <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: '19.6px', color: '#828183', margin: 0, textAlign: 'center', whiteSpace: 'pre-line' }}>
            {desc}
          </p>
        </div>
      </div>
      {/* CTA Button */}
      <button
        className="inline-flex items-center justify-center font-bold cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-9)]"
        style={{
          height:          '40px',
          padding:         '0 16px',
          gap:             '8px',
          fontSize:        '16px',
          fontWeight:      700,
          borderRadius:    '8px',
          backgroundColor: '#E1F7F6',
          color:           '#297473',
          alignSelf:       'stretch',
          whiteSpace:      'nowrap',
        }}
      >
        <span>{cta}</span>
        <IconArrowNarrowRight size={20} strokeWidth={2} />
      </button>
    </motion.div>
  )
}

function WebQuickAccessSection() {
  return (
    <section className="w-full py-8 lg:py-12" style={{ backgroundColor: '#F9F9FA' }}>
      <Container className="flex flex-col gap-4 lg:gap-8 h-full">
        <SectionTitle>Accès rapides</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          {quickAccessData.map((item, i) => (
            <QuickAccessCard key={i} {...item} />
          ))}
        </div>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   E) RECOMMANDÉ PAR LES LECTEURS — Catégories + Livres
   Repris fidèlement depuis Figma node 854:7936
   padding: 160px 40px, gap: 96px sur 1920px
   ══════════════════════════════════════════════════════════════ */
const BOOK_COVER_COLORS = [
  '#F4D2DE', '#E1F7F6', '#DCE8FF', '#FFD8B7',
  '#DAF1DB', '#F0C2D3', '#CFF1F0', '#65BA74',
]

const CATEGORIES = [
  'Polar', 'Science-fiction', 'Fantastique', 'Roman',
  'BD', 'Poésie', 'Théâtre', 'Histoire',
]

function CategoryCard({ title }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="flex shrink-0 items-center cursor-pointer relative overflow-hidden"
      style={{
        width:              '190px',
        height:             '80px',
        background:         'linear-gradient(224deg, #FAFEFD 6%, #E1F7F6 90%)',
        border:             '1px solid #A6DCDA',
        borderRadius:       '8px',
        padding:            '12px',
        boxShadow:          SHADOW_NAV,
      }}
      role="button"
      tabIndex={0}
      aria-label={`Catégorie ${title}`}
    >
      <span style={{ position: 'relative', zIndex: 10, fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '24px', lineHeight: '120%', color: '#297473', whiteSpace: 'pre-line' }}>
        {title}
      </span>

      <div
        style={{
          position: 'absolute',
          right: '-10px',
          bottom: '-12px',
          width: '56px',
          height: '80px',
          borderRadius: '4px',
          boxShadow: SHADOW_COVER,
          transform: 'rotate(15deg)',
          overflow: 'hidden',
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        <img
          src="/images/category-card-img.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </motion.div>
  )
}

/* Flèches de défilement */
function ScrollArrows({ onLeft, onRight, height }) {
  const h = height || '32px'
  return (
    <div className="flex items-center" style={{ gap: '8px' }}>
      <button
        onClick={onLeft}
        className="flex items-center justify-center cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-9)] shrink-0"
        style={{
          width:  '32px',
          height: h,
          borderRadius: '6px',
          background: 'linear-gradient(224deg, #FAFEFD 6%, #E1F7F6 90%)',
          border: '1px solid #A6DCDA',
          color: '#297473',
        }}
        aria-label="Défiler vers la gauche"
      >
        <IconChevronLeft size={16} strokeWidth={2} />
      </button>
      <button
        onClick={onRight}
        className="flex items-center justify-center cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-9)] shrink-0"
        style={{
          width:  '32px',
          height: h,
          borderRadius: '6px',
          background: 'linear-gradient(224deg, #FAFEFD 6%, #E1F7F6 90%)',
          border: '1px solid #A6DCDA',
          color: '#297473',
        }}
        aria-label="Défiler vers la droite"
      >
        <IconChevronRight size={16} strokeWidth={2} />
      </button>
    </div>
  )
}

/* BookCard — selon le composant BOOK Figma :
   couverture 194×300, titre Lora Bold 20px, auteur + rating */
function BookCard({ book, colorIndex }) {
  return (
    <motion.div
      role="listitem"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="flex flex-col shrink-0 cursor-pointer"
      tabIndex={0}
      aria-label={`${book.title} par ${book.author} — ${book.rating}/5`}
      style={{ width: '194px' }}
    >
      {/* Couverture */}
      <div
        style={{
          width:           '194px',
          height:          '300px',
          backgroundColor: BOOK_COVER_COLORS[colorIndex % BOOK_COVER_COLORS.length],
          borderRadius:    '6px',
          overflow:        'hidden',
          flexShrink:      0,
          boxShadow:       SHADOW_COVER,
        }}
      >
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
      </div>

      {/* Infos */}
      <div className="flex flex-col" style={{ padding: '10px 0', gap: '2px' }}>
        {/* Titre */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize:   '20px',
            lineHeight: '30px',
            color:      '#222123',
            margin:      0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {book.title}
        </p>
        {/* Auteur + note inline */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize:   '14px',
            lineHeight: '21px',
            color:      '#828183',
            margin:      0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {book.author} ({book.rating}/5)
        </p>
      </div>
    </motion.div>
  )
}

function WebRecommendationsSection() {
  const catScrollRef = useRef(null)
  const bookScrollRef = useRef(null)

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction * 300, behavior: 'smooth' })
    }
  }

  return (
    <section
      className="w-full py-10 lg:py-[160px]"
      style={{ backgroundColor: '#FCFCFD' }}
    >
      {/* Conteneur avec max-width 1920 et padding 40px (Figma n'a pas 320px ici) */}
      <div className="w-full mx-auto px-10 max-w-[1920px] flex flex-col gap-12 lg:gap-[96px]">
        {/* Titre */}
        <h2
          style={{
            fontFamily:  'var(--font-brand)',
            fontWeight:  700,
            fontSize:    '24px',
            lineHeight:  '31.2px',
            color:       '#204140',
            margin:       0,
          }}
        >
          Recommandé par les lecteurs
        </h2>

        {/* Ligne 1 : Catégories */}
        <div className="flex items-center" style={{ gap: '20px' }}>
          <button
            onClick={() => scroll(catScrollRef, -1)}
            className="flex items-center justify-center cursor-pointer border-none outline-none focus-visible:ring-2 shrink-0"
            style={{
              width:  '32px',
              height: '80px',
              borderRadius: '6px',
              background: 'linear-gradient(224deg, #FAFEFD 6%, #E1F7F6 90%)',
              border: '1px solid #A6DCDA',
              color: '#297473',
            }}
            aria-label="Défiler vers la gauche"
          >
            <IconChevronLeft size={20} strokeWidth={2} />
          </button>
          <div
            ref={catScrollRef}
            className="flex overflow-x-auto items-center"
            style={{
              gap:               '16px',
              scrollBehavior:    'smooth',
              scrollbarWidth:    'none',
              msOverflowStyle:   'none',
              flex:               1,
            }}
          >
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat} title={cat} />
            ))}
          </div>
          <button
            onClick={() => scroll(catScrollRef, 1)}
            className="flex items-center justify-center cursor-pointer border-none outline-none focus-visible:ring-2 shrink-0"
            style={{
              width:  '32px',
              height: '80px',
              borderRadius: '6px',
              background: 'linear-gradient(224deg, #FAFEFD 6%, #E1F7F6 90%)',
              border: '1px solid #A6DCDA',
              color: '#297473',
            }}
            aria-label="Défiler vers la droite"
          >
            <IconChevronRight size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Ligne 2 : Livres recommandés */}
        <div className="flex items-start" style={{ gap: '28px' }}>
          <button
            onClick={() => scroll(bookScrollRef, -1)}
            className="flex items-center justify-center cursor-pointer border-none outline-none focus-visible:ring-2 shrink-0"
            style={{
              width:  '32px',
              height: '300px',
              borderRadius: '6px',
              background: 'linear-gradient(224deg, #FAFEFD 6%, #E1F7F6 90%)',
              border: '1px solid #A6DCDA',
              color: '#297473',
            }}
            aria-label="Défiler vers la gauche"
          >
            <IconChevronLeft size={20} strokeWidth={2} />
          </button>
          <div
            ref={bookScrollRef}
            className="flex overflow-x-auto items-start"
            style={{
              gap:               '28px',
              padding:           '12px 0',
              scrollBehavior:    'smooth',
              scrollbarWidth:    'none',
              msOverflowStyle:   'none',
              flex:               1,
            }}
            role="list"
            aria-label="Suggestions de livres"
          >
            {BOOKS.slice(0, 8).map((book, i) => (
              <BookCard key={book.id} book={book} colorIndex={i} />
            ))}
          </div>
          <button
            onClick={() => scroll(bookScrollRef, 1)}
            className="flex items-center justify-center cursor-pointer border-none outline-none focus-visible:ring-2 shrink-0"
            style={{
              width:  '32px',
              height: '300px',
              borderRadius: '6px',
              background: 'linear-gradient(224deg, #FAFEFD 6%, #E1F7F6 90%)',
              border: '1px solid #A6DCDA',
              color: '#297473',
            }}
            aria-label="Défiler vers la droite"
          >
            <IconChevronRight size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   F) À NE PAS MANQUER — Festival 33 Tour + YouTube embed
   padding: 80px 320px, gap: 48px, bg: #FEF6F9
   ══════════════════════════════════════════════════════════════ */
function WebHighlightSection() {
  return (
    <section className="w-full py-10 lg:py-[80px]" style={{ backgroundColor: '#FEF6F9' }}>
      <Container className="flex flex-col gap-8 lg:gap-[48px]">
        <SectionTitle>À ne pas manquer</SectionTitle>

        <div className="flex flex-col xl:flex-row gap-8 lg:gap-[48px] items-start">
          {/* Event card — Festival 33 Tour */}
          <motion.a
            href="#evenement-festival"
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="flex flex-col sm:flex-row overflow-hidden no-underline focus:outline-none focus-visible:ring-2 w-full xl:flex-1"
            style={{
              backgroundColor: '#FCFCFD',
              border:          '1px solid #F1F0F1',
              borderRadius:    '14px',
              boxShadow:       SHADOW_CARD,
            }}
            aria-label="Festival 33 Tour — En savoir plus"
          >
            {/* Image à gauche (300px) */}
            <div className="shrink-0 w-full sm:w-[300px]" style={{ minHeight: '240px', position: 'relative', overflow: 'hidden', backgroundColor: '#F4D2DE' }} aria-hidden="true">
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'url(/images/event-joel-dicker.png) center/cover no-repeat',
                }}
              />
            </div>
            {/* Contenu à droite */}
            <div className="flex flex-col justify-center" style={{ padding: '28px', gap: '15px', flex: 1 }}>
              <Badge variant="default" size="large">Festival • Mériadeck</Badge>
              <h3 style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '32px', lineHeight: '120%', color: '#222123', margin: 0 }}>
                Festival 33 Tour
              </h3>
              <p style={{ fontSize: '20px', fontWeight: 400, lineHeight: '30px', color: '#656366', margin: 0 }}>
                En juin, la scène musicale locale fait la tournée des bibliothèques
              </p>
              <span className="inline-flex items-center" style={{ gap: '8px', fontSize: '20px', fontWeight: 600, color: '#297473' }}>
                En savoir plus
                <IconArrowRight size={20} strokeWidth={2} />
              </span>
            </div>
          </motion.a>

          {/* YouTube video placeholder */}
          <div
            className="flex flex-col shrink-0 w-full xl:w-[467px]"
            style={{ gap: '8px', alignItems: 'flex-end' }}
          >
            <div
              className="w-full"
              style={{
                height: '262px',
                backgroundColor: '#000',
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden',
              }}
              aria-label="Vidéo YouTube"
            >
              {/* Video thumbnail */}
              <img
                src="/images/video-thumbnail.jpg"
                alt=""
                aria-hidden="true"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.54) 25%, rgba(0,0,0,0.36) 50%, rgba(0,0,0,0.18) 75%, rgba(0,0,0,0) 100%)',
                }}
              />
              {/* Play button */}
              <div
                className="absolute flex items-center justify-center cursor-pointer"
                style={{
                  left: '30px',
                  bottom: '24px',
                  width: '56px',
                  height: '48px',
                  borderRadius: '48px',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(4px)',
                }}
                aria-label="Lire la vidéo"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              {/* "Watch on YouTube" button */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  right: '24px',
                  bottom: '24px',
                  width: '213px',
                  height: '48px',
                  borderRadius: '24px',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(4px)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 600,
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M10 16.5v-9l6 4.5-6 4.5z" />
                </svg>
                <span>Regarder sur YouTube</span>
              </div>
            </div>
            {/* CTA button */}
            <button
              className="inline-flex items-center justify-center font-bold cursor-pointer border-none outline-none focus-visible:ring-2"
              style={{
                height: '40px',
                padding: '0 16px',
                gap: '8px',
                fontSize: '16px',
                fontWeight: 700,
                borderRadius: '8px',
                backgroundColor: '#E1F7F6',
                color: '#25706F',
                alignSelf: 'stretch',
                whiteSpace: 'nowrap',
              }}
            >
              <span>Voir la chaîne YouTube</span>
              <IconArrowNarrowRight size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   G) L'AGENDA DU RÉSEAUX — toggle filters + event cards grid
   padding: 80px 320px, gap: 48px, bg: #FFFAFC
   ══════════════════════════════════════════════════════════════ */
const TOGGLE_ITEMS = [
  'À la une',
  'Rencontres & Dédicaces',
  'Jeunesse & Famille',
  'Ateliers & Formations',
  'Débats & Société',
  'Accessibilité',
]

const EVENT_ITEMS = [
  {
    badge: 'Exposition • Mériadeck',
    title: 'Rencontre avec Joël Dicker',
    desc: "L'auteur sera à Bordeaux le 15 mars pour dédicaces et une rencontre\nouverte au public à la Bibliothèque Mériadeck.",
    meta: 'Jeudi 4 juin à 17h30 - Bibliothèque Mériadeck',
    img: '/images/event-joel-dicker.png',
  },
  {
    badge: 'Exposition • Mériadeck',
    title: 'Rencontre dessinée\navec Véronique Tadjo',
    desc: "Rencontre animée par l'écrivaine Beata Umubyeyi. Mairesse et illustrée par Mikankey",
    meta: 'Jeudi 4 juin à 17h30 - Bibliothèque Mériadeck',
    img: '/images/event-veronique.jpg',
  },
  {
    badge: 'Exposition • Mériadeck',
    title: 'Révise à la bibli !',
    desc: "Les bibliothèques Bordeaux-Lac, La Bastide,\nMériadeck et Pierre Veilletet sont aux côtés des\nélèves préparant le bac et le brevet pour réviser et s'entraîner aux oraux",
    meta: 'Du 13 mai au 27 juin',
    img: '/images/event-revise.jpg',
  },
  {
    badge: 'Exposition • Mériadeck',
    title: '1001 Bornes – Joseph Le Callennec, as du crayon',
    desc: "Exposition autour du célèbre jeu des 1000 bornes dans le cadre de la biennale d'art graphique",
    meta: 'Du 27 mai au 27 juin - Bibliothèque Mériadeck',
    img: '/images/event-1001bornes.jpg',
  },
]

function ToggleButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center font-bold cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-9)]"
      style={{
        height:          '40px',
        padding:         '0 16px',
        gap:             '8px',
        fontSize:        '16px',
        fontWeight:      700,
        borderRadius:    '8px',
        backgroundColor: active ? '#E1F7F6' : '#F9F9FA',
        color:           active ? '#297473' : '#656366',
        border:          active ? '1px solid #63B5B4' : '1px solid #DAD9DB',
        whiteSpace:      'nowrap',
        transition:      'all 150ms',
      }}
    >
      {label}
    </button>
  )
}

function EventCard({ event }) {
  return (
    <motion.a
      href="#event-detail"
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="flex flex-col lg:flex-row overflow-hidden no-underline focus:outline-none focus-visible:ring-2"
      style={{
        backgroundColor: '#FCFCFD',
        border:          '1px solid #F1F0F1',
        borderRadius:    '14px',
        boxShadow:       SHADOW_CARD,
        width:           '100%',
        minHeight:       '300px',
      }}
      aria-label={`${event.title} — En savoir plus`}
    >
      {/* Image à gauche */}
      <div className="shrink-0 w-full lg:w-[300px] h-[200px] lg:h-auto" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#F4D2DE' }} aria-hidden="true">
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${event.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
      </div>
      {/* Contenu à droite */}
      <div className="flex flex-col justify-center px-6 py-6 lg:py-[28px] lg:pr-[28px]" style={{ gap: '15px', flex: 1 }}>
        <Badge variant="default" size="large">{event.badge}</Badge>
        <h3 style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '24px', lineHeight: '31.2px', color: '#222123', margin: 0, whiteSpace: 'pre-line' }}>
          {event.title}
        </h3>
        <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#656366', margin: 0, whiteSpace: 'pre-line' }}>
          {event.desc}
        </p>
        <p style={{ fontSize: '16px', fontWeight: 700, lineHeight: '150%', color: '#4D0F26', margin: 0 }}>
          {event.meta}
        </p>
        <span className="inline-flex items-center" style={{ gap: '4px', fontSize: '14px', fontWeight: 500, color: '#297473', textDecoration: 'underline' }}>
          En savoir plus
          <IconArrowRight size={14} strokeWidth={2} />
        </span>
      </div>
    </motion.a>
  )
}

function WebAgendaSection() {
  const [activeToggle, setActiveToggle] = useState('À la une')

  return (
    <section className="w-full py-10 lg:py-[80px]" style={{ backgroundColor: '#FFFAFC' }}>
      <Container className="flex flex-col gap-8 lg:gap-[48px]">
        <SectionTitle>L&rsquo;agenda du réseaux</SectionTitle>

        {/* Toggle filters row */}
        <div className="flex items-center" style={{ gap: '16px', flexWrap: 'wrap' }}>
          {TOGGLE_ITEMS.map(item => (
            <ToggleButton
              key={item}
              label={item}
              active={activeToggle === item}
              onClick={() => setActiveToggle(item)}
            />
          ))}
          {/* "Tout l'agenda" button */}
          <button
            className="inline-flex items-center justify-center font-bold cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-9)]"
            style={{
              height:          '40px',
              padding:         '0 16px',
              gap:             '8px',
              fontSize:        '16px',
              fontWeight:      700,
              borderRadius:    '8px',
              backgroundColor: '#25706F',
              color:           'white',
              boxShadow:       SHADOW_NAV,
              whiteSpace:      'nowrap',
            }}
          >
            <IconCalendarEvent size={20} strokeWidth={2} />
            <span>Tout l'agenda</span>
            <IconArrowNarrowRight size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Event cards grid 2x2 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-[28px]">
          {EVENT_ITEMS.map((event, i) => (
            <EventCard key={i} event={event} />
          ))}
        </div>
      </Container>
    </section>
  )
}


/* ══════════════════════════════════════════════════════════════
   H) DÉCOUVRIR LE PATRIMOINE — overlay background + 3 cards
   padding: 58px 320px, gap: 48px, border-bottom: 20px solid #357E7D
   ══════════════════════════════════════════════════════════════ */
function WebHeritageSection() {
  return (
    <section
      className="w-full py-10 lg:py-[58px]"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '20px solid #357E7D',
      }}
    >
      {/* Background image avec overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="/images/heritage-bg.png"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
      </div>
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundColor: 'rgba(255,255,255,0.7)',
        }}
      />

      {/* Content */}
      <Container className="relative z-[2] flex flex-col gap-8 lg:gap-[48px]">
        <SectionTitle>Découvrir le patrimoine</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[38px]">
          {/* Card 1 */}
          <PatrimoineCard title="Les collections" subtitle="patrimoniales" />
          {/* Card 2 */}
          <PatrimoineCard title="Séléné" subtitle="la bibliothèque numérique" />
          {/* Card 3 */}
          <PatrimoineCard title="Les essais" subtitle="de montaigne" />
        </div>
      </Container>
    </section>
  )
}

function PatrimoineCard({ title, subtitle }) {
  return (
    <motion.a
      href="#patrimoine-detail"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="flex flex-col items-center no-underline focus:outline-none focus-visible:ring-2 w-full"
      style={{
        backgroundColor: '#FCFCFD',
        border: '1px solid #F1F0F1',
        borderRadius: '14px',
        boxShadow: SHADOW_CARD,
        padding: '24px',
        gap: '12px',
      }}
    >
      <div className="flex flex-col items-center" style={{ gap: '6px' }}>
        <p style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '24px', lineHeight: '120%', color: '#222123', margin: 0, textAlign: 'center' }}>
          {title}
        </p>
        <p style={{ fontSize: '20px', fontWeight: 700, lineHeight: '30px', color: '#656366', margin: 0, textAlign: 'center' }}>
          {subtitle}
        </p>
      </div>
    </motion.a>
  )
}


/* ══════════════════════════════════════════════════════════════
   I) FOOTER — 232px de haut
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
    <footer
      className="w-full py-10"
      style={{
        backgroundColor: '#F9F9FA',
        borderTop: '1px solid #DAD9DB',
      }}
    >
      <Container className="flex flex-col md:flex-row flex-wrap justify-between gap-8 relative">
      {/* Left Column: Logo + Nav + Copyright */}
      <div className="flex flex-col gap-6">
      {/* Logo + Nom */}
      <div className="flex items-center gap-3">
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '9999px',
            backgroundColor: '#F4D2DE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          <img src="/images/logo-icon.svg" alt="" width={20} height={20} style={{ display: 'block' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '16px', lineHeight: '24px', color: '#204140' }}>
          Bibliothèques de Bordeaux
        </span>
      </div>

      {/* Liens nav */}
      <nav aria-label="Navigation secondaire">
        <ul className="flex flex-wrap list-none m-0 p-0 gap-4 md:gap-[24px]">
          {FOOTER_LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} className="no-underline hover:underline focus:underline focus:outline-none"
                style={{ fontSize: '14px', fontWeight: 500, color: '#656366', lineHeight: '21px' }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Divider - visible only on desktop to match original design flow roughly */}
      <div className="hidden md:block w-full h-[1px] bg-[#DAD9DB] my-2" aria-hidden="true" />

      {/* Bottom info row */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
        {/* Copyright */}
        <p
          style={{
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '18px',
            color: '#828183',
            margin: 0,
            maxWidth: '442px',
          }}
        >
          &copy; Bordeaux Métropole, 2022<br />
          Propulsé par @InMédia Technologis, 2022 et @alizéeBompanM2ECV2026
        </p>

        {/* Logo Ville de Bordeaux */}
        <div style={{ width: '132px', height: '31px' }} aria-label="Logo Ville de Bordeaux">
          <img
            src="/images/logo-ville-bordeaux.png"
            alt="Ville de Bordeaux"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </div>
      </div>
      </div>

      {/* Right Column: Nous suivre + Réseaux sociaux */}
      <div className="flex flex-col items-start md:items-center gap-3">
        <span style={{ fontSize: '14px', fontWeight: 500, lineHeight: '21px', color: '#656366', textAlign: 'center' }}>
          Nous suivre
        </span>
        <div className="flex items-center justify-center" style={{ gap: '8px' }}>
          {/* Facebook */}
          <a href="#facebook" aria-label="Facebook" className="flex items-center justify-center no-underline"
            style={{ width: '28px', height: '27px', borderRadius: '5px', color: '#297473' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#297473">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="#instagram" aria-label="Instagram" className="flex items-center justify-center no-underline"
            style={{ width: '28px', height: '27px', borderRadius: '5px', color: '#297473' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#297473">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="#linkedin" aria-label="LinkedIn" className="flex items-center justify-center no-underline"
            style={{ width: '28px', height: '27px', borderRadius: '5px', color: '#297473' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#297473">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          {/* TikTok */}
          <a href="#tiktok" aria-label="TikTok" className="flex items-center justify-center no-underline"
            style={{ width: '28px', height: '27px', borderRadius: '5px', color: '#297473' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#297473">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </a>
        </div>
      </div>
      </Container>
    </footer>
  )
}


/* ══════════════════════════════════════════════════════════════
   APP — Point d'entrée
   ══════════════════════════════════════════════════════════════ */
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="min-h-screen w-full" style={{ fontFamily: 'var(--font-body)', backgroundColor: '#F9F9FA', color: '#656366' }}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded focus:bg-[#25706F] focus:text-white focus:font-bold focus:no-underline">
        Aller au contenu
      </a>

      <WebHeader isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} onLogout={() => setIsLoggedIn(false)} />
      <WebNav />

      <main id="main-content">
        <WebHero />
        <WebQuickAccessSection />
        <WebRecommendationsSection />
        <WebHighlightSection />
        <WebAgendaSection />
        <WebHeritageSection />
      </main>

      <WebFooter />
    </div>
  )
}
