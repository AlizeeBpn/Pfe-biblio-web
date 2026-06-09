import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  IconSearch,
  IconUser,
  IconMenu2,
  IconX,
  IconUserPlus,
  IconLogout,
  IconSettings,
  IconEye,
  IconCalendarEvent,
  IconChevronRight,
  IconBuildingStore,
  IconBook,
  IconMessageChatbot,
} from '@tabler/icons-react'

import useViewport from '../hooks/useViewport'
import BookCover from '../components/BookCover'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { BOOKS } from '../data/books'
import {
  WebHeader,
  WebNav,
  WebHero,
  WebHighlightSection,
  WebQuickAccessSection,
  WebRecommendationsSection,
  WebAgendaSection,
  WebHeritageSection,
  WebFooter,
} from '../App'

const SHADOW_HEADER = '0px 18px 7px 0px rgba(142,141,143,0.01), 0px 10px 6px 0px rgba(142,141,143,0.05), 0px 4px 4px 0px rgba(142,141,143,0.09), 0px 1px 2px 0px rgba(142,141,143,0.10)'
const SHADOW_CARD  = '0px 18px 7px 0px rgba(142,141,143,0.01), 0px 10px 6px 0px rgba(142,141,143,0.05), 0px 4px 4px 0px rgba(142,141,143,0.09), 0px 1px 2px 0px rgba(142,141,143,0.10)'
const SHADOW_NAV   = '0px 2px 10px 0px rgba(99,181,180,0.08), 0px -2px 10px 0px rgba(99,181,180,0.08)'

const NAV_ITEMS = [
  { label: 'Accueil',    href: '#accueil',    icon: '/images/icon-home.svg'     },
  { label: 'Pratique',   href: '#pratique',   icon: '/images/icon-hands.svg'    },
  { label: 'Catalogue',  href: '#catalogue',  icon: '/images/icon-search2.svg'  },
  { label: 'Patrimoine', href: '#patrimoine', icon: '/images/icon-archive.svg'  },
  { label: 'Agenda',     href: '#agenda',     icon: '/images/icon-calendar.svg' },
  { label: 'Services',   href: '#services',   icon: '/images/icon-services.svg' },
]

/* ══════════════════════════════════════════════════════════════
   TABLET / MOBILE LAYOUT
   ══════════════════════════════════════════════════════════════ */
function TabletLayout({ isLoggedIn, onLogin, onLogout }) {
  const [burgerOpen, setBurgerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen w-full" style={{ fontFamily: 'var(--font-body)', backgroundColor: 'var(--color-white)', color: 'var(--color-text-body)', maxWidth: '430px', marginInline: 'auto' }}>
      <TabletHeader isLoggedIn={isLoggedIn} onLogin={onLogin} onLogout={onLogout} burgerOpen={burgerOpen} setBurgerOpen={setBurgerOpen} />

      <TabletHeroBanner />

      {/* Recherche après le hero */}
      <div style={{ padding: '20px 16px 12px', backgroundColor: 'var(--color-white)' }}>
        <div className="flex items-center w-full" style={{ height: '48px', backgroundColor: 'white', border: '1px solid #DAD9DB', borderRadius: '9999px', padding: '0 16px', gap: '8px', boxShadow: SHADOW_HEADER }}>
          <IconSearch size={18} strokeWidth={2} color="#8E8D8F" aria-hidden="true" />
          <input type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Chercher un livre…" aria-label="Chercher un livre" className="flex-1 bg-transparent outline-none border-none" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#222123' }} />
        </div>
      </div>
      <div style={{ height: '16px' }} />
      <TabletQuickAccessCards />
      <div style={{ height: '32px' }} />
      <TabletCategorySlider />
      <div style={{ height: '8px' }} />
      <TabletBookCarousel books={BOOKS.slice(0, 6)} />
      <div style={{ height: '28px' }} />
      <TabletHighlightFestival />
      <div style={{ height: '32px' }} />
      <TabletAgendaPills />
      <TabletAgendaEventCards />
      <div style={{ height: '24px' }} />
      <TabletHeritageSection />
      <TabletFooter />
    </div>
  );
}

/* ── Header (sans bouton accessibilité, déplacé dans burger) ── */
function TabletHeader({ isLoggedIn, onLogin, onLogout, burgerOpen, setBurgerOpen }) {
  return (
    <header className="sticky top-0 z-50 w-full" style={{ height: '60px', backgroundColor: 'white', borderBottom: '1px solid #F1F0F1', boxShadow: SHADOW_HEADER }}>
      <div className="h-full flex items-center justify-between px-4 gap-2">
        <a href="#" aria-label="Bibliothèques de Bordeaux — accueil" className="flex items-center shrink-0 no-underline" style={{ gap: '10px', height: '36px' }}>
          <div className="shrink-0 flex items-center justify-center" style={{ width: '36px', height: '36px' }}>
            <img src="/images/logo-icon.svg" alt="" aria-hidden="true" width={36} height={36} style={{ display: 'block' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '16px', lineHeight: '20px', color: '#204140', whiteSpace: 'nowrap' }}>Bibliothèques de Bordeaux</span>
        </a>

        <button onClick={() => setBurgerOpen(!burgerOpen)} className="flex items-center justify-center bg-transparent border-none cursor-pointer shrink-0" style={{ width: '40px', height: '40px', color: '#204140' }} aria-label={burgerOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
          {burgerOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {burgerOpen && (
        <div className="absolute left-0 right-0 z-50" style={{ top: '100%', backgroundColor: '#204140', borderTop: '1px solid #297473', boxShadow: SHADOW_HEADER }}>
          <ul className="list-none m-0 p-0 py-[12px]">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={e => { e.preventDefault(); setBurgerOpen(false) }} className="flex items-center no-underline w-full" style={{ gap: '12px', padding: '12px 20px', fontSize: '16px', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>
                  <img src={item.icon} alt="" aria-hidden="true" width={20} height={20} style={{ display: 'block', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div style={{ borderTop: '1px solid #297473', padding: '12px 20px' }}>
            {isLoggedIn ? (
              <div className="flex flex-col" style={{ gap: '8px' }}>
                <div className="flex items-center gap-[10px]">
                  <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary-9)' }}><IconUser size={16} strokeWidth={2.5} color="white" /></div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>Mon espace</span>
                </div>
                <div style={{ height: '1px', backgroundColor: '#297473', margin: '4px 0' }} />
                <a href="#mon-espace" className="flex items-center gap-[12px] no-underline" style={{ padding: '8px 0', fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}><IconUser size={18} strokeWidth={1.8} color="#357E7D" /> Mon profil</a>
                <a href="#parametres" className="flex items-center gap-[12px] no-underline" style={{ padding: '8px 0', fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}><IconSettings size={18} strokeWidth={1.8} color="#8E8D8F" /> Paramètres</a>
                <button onClick={() => { onLogout(); setBurgerOpen(false) }} className="flex items-center gap-[12px] w-full bg-transparent border-none cursor-pointer" style={{ padding: '8px 0', fontSize: '14px', color: '#C53B40', textAlign: 'left' }}><IconLogout size={18} strokeWidth={1.8} /> Déconnexion</button>
              </div>
            ) : (
              <>
                <button onClick={() => { onLogin(); setBurgerOpen(false) }} className="flex items-center justify-center font-bold cursor-pointer border-none outline-none w-full" style={{ height: '40px', padding: '0 16px', gap: '6px', fontSize: '14px', borderRadius: '8px', backgroundColor: '#25706F', color: 'white', boxShadow: SHADOW_NAV, marginBottom: '8px' }}><IconUserPlus size={16} strokeWidth={2} /> Inscription</button>
                <button onClick={() => { onLogin(); setBurgerOpen(false) }} className="flex items-center justify-center font-semibold cursor-pointer border-none outline-none w-full" style={{ height: '40px', padding: '0 16px', gap: '6px', fontSize: '14px', borderRadius: '8px', backgroundColor: 'white', color: '#656366', border: '2px solid #CFCDD0' }}><IconUser size={16} strokeWidth={2} /> Connexion</button>
                {/* Accessibilité dans le burger */}
                <button onClick={() => setBurgerOpen(false)} className="flex items-center justify-center font-semibold cursor-pointer border-none outline-none w-full mt-[8px]" aria-label="Options d'accessibilité" style={{ height: '40px', padding: '0 16px', gap: '6px', fontSize: '14px', borderRadius: '8px', backgroundColor: '#F4D2DE', color: '#4D0F26', border: '1px solid #E8BCC8' }}><IconEye size={16} strokeWidth={2} /> Accessibilité</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Hero ── */
function TabletHeroBanner() {
  return (
    <div style={{ overflow: 'hidden', position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center' }}>
      {/* Image de fond */}
      <img
        src="/images/bibliotheque-meriadeck-modernisation-600ea42d10895907865413%20(1).jpg"
        alt=""
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      {/* Overlay vert */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(131deg, rgba(28,55,54,1) 0%, rgba(32,90,89,0.75) 100%)' }} />
      {/* Texte */}
      <div style={{ position: 'relative', zIndex: 2, padding: '32px 24px', color: 'white', width: '100%' }}>
        <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: '24px', fontWeight: 700, margin: 0, lineHeight: '32px' }}>Explorez, découvrez,<br />vivez la culture</h2>
        <p style={{ fontSize: '15px', marginTop: '10px', opacity: 0.9, lineHeight: '22px' }}>Accédez à 1,3 million de documents et participez à la vie culturelle du réseau des Bibliothèques de Bordeaux.</p>
      </div>
    </div>
  );
}

/* ── Quick Access — grille 2×2, bouton fixe en bas ── */
function TabletQuickAccessCards() {
  const cards = [
    { title: 'Contact', desc: 'Discussion en ligne ou réservation de communication sur place', cta: 'Contacter', icon: <IconMessageChatbot size={24} strokeWidth={1.5} color="#297473" />, iconBg: '#E1F7F6' },
    { title: 'Accessibilité', desc: 'Des services adaptés pour faciliter votre accès à la lecture', cta: 'En savoir plus', icon: <IconEye size={24} strokeWidth={1.5} color="#297473" />, iconBg: '#E1F7F6' },
    { title: 'Mériadeck', desc: '85 Cr Maréchal Juin, 33000 Bordeaux — Ouvert jusqu\'à 20h', cta: 'Voir plus', icon: <IconBuildingStore size={24} strokeWidth={1.5} color="#4D0F26" />, iconBg: '#F4D2DE' },
    { title: 'Ressources numériques', desc: 'Livres, musique, films et presse en ligne', cta: 'Explorer', icon: <IconBook size={24} strokeWidth={1.5} color="#297473" />, iconBg: '#E1F7F6' },
  ];

  return (
    <div className="flex flex-col" style={{ gap: '14px', padding: '0 16px 24px' }}>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '20px', color: 'var(--color-text-brand)', margin: '0 0 4px' }}>Accès rapides</h2>
      <div className="grid grid-cols-2" style={{ gap: '8px' }}>
        {cards.map(card => (
          <motion.div key={card.title} whileTap={{ scale: 0.98 }} className="flex flex-col" style={{ backgroundColor: '#FCFCFD', border: '1px solid #F1F0F1', borderRadius: '12px', boxShadow: SHADOW_CARD, padding: '14px 10px' }}>
            <div className="flex flex-col items-center" style={{ gap: '6px', flex: 1 }}>
              <span aria-hidden="true" className="flex items-center justify-center rounded-full" style={{ width: '38px', height: '38px', backgroundColor: card.iconBg }}>{card.icon}</span>
              <p style={{ fontSize: '14px', fontWeight: 600, lineHeight: '18px', color: '#222123', margin: 0, textAlign: 'center' }}>{card.title}</p>
              <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: '18px', color: '#828183', margin: 0, textAlign: 'center' }}>{card.desc}</p>
            </div>
            <button className="inline-flex items-center justify-center font-bold cursor-pointer border-none outline-none mt-auto" style={{ height: '44px', marginTop: '10px', padding: '0 10px', gap: '4px', fontSize: '14px', fontWeight: 700, borderRadius: '8px', backgroundColor: '#E1F7F6', color: '#297473' }}>
              <span>{card.cta}</span>
              <IconChevronRight size={14} strokeWidth={2} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Categories slider ── */
const TABLET_CATEGORIES = ['Roman', 'BD', 'Jeunesse', 'Sciences', 'Histoire', 'Arts', 'Policier', 'SF', 'Philo', 'Voyages'];
function TabletCategorySlider() {
  return (
    <div className="flex flex-col" style={{ gap: '16px', padding: '0 16px 32px' }}>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '20px', color: 'var(--color-text-brand)', margin: '0 0 4px' }}>Recommandé par les lecteurs</h2>
      <div style={{ marginRight: '-16px' }}>
        <div className="flex overflow-x-auto" style={{ gap: '8px', paddingBottom: '4px', paddingRight: '16px', scrollbarWidth: 'none' }}>
          {TABLET_CATEGORIES.map(cat => (
            <motion.div key={cat} whileTap={{ scale: 0.96 }} className="relative shrink-0 flex items-center overflow-hidden" style={{ width: '140px', height: '60px', padding: '10px 12px', borderRadius: '8px', border: '1px solid #A6DCDA', background: 'linear-gradient(224deg, #FAFEFD 6%, #E1F7F6 90%)', boxShadow: SHADOW_NAV, cursor: 'pointer' }}>
              <span style={{ position: 'relative', zIndex: 10, fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '14px', lineHeight: '120%', color: '#297473' }}>{cat}</span>
              <div style={{ position: 'absolute', right: '-8px', bottom: '-10px', width: '40px', height: '56px', borderRadius: '4px', boxShadow: '0px -1px 2px 0px rgba(142,141,143,0.10), 0px -3px 3px 0px rgba(142,141,143,0.09), 0px -6px 4px 0px rgba(142,141,143,0.05), 0px 2px 4px 0px rgba(142,141,143,0.10), 0px 7px 7px 0px rgba(142,141,143,0.09)', transform: 'rotate(15deg)', overflow: 'hidden', zIndex: 1 }} aria-hidden="true">
                <img src="/images/category-card-img.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Festival card ── */
function TabletHighlightFestival() {
  return (
    <div className="flex flex-col" style={{ gap: '16px', padding: '0 16px 32px' }}>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '20px', color: 'var(--color-text-brand)', margin: '0 0 4px' }}>À ne pas manquer</h2>
      <motion.a href="#evenement-festival" whileTap={{ scale: 0.98 }} className="flex flex-col overflow-hidden no-underline" style={{ backgroundColor: '#FCFCFD', border: '1px solid #F1F0F1', borderRadius: '14px', boxShadow: SHADOW_CARD }} aria-label="Festival 33 Tour — En savoir plus">
        <div style={{ height: '160px', position: 'relative', overflow: 'hidden', backgroundColor: '#F4D2DE' }} aria-hidden="true">
          <div style={{ position: 'absolute', inset: 0, background: 'url(/images/event-festival33.png) center/cover no-repeat' }} />
        </div>
        <div className="flex flex-col" style={{ padding: '16px', gap: '10px' }}>
          <Badge variant="default" size="medium">Festival • Mériadeck</Badge>
          <h3 style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '18px', lineHeight: '120%', color: '#222123', margin: 0 }}>Festival 33 Tour</h3>
          <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: '21px', color: '#656366', margin: 0 }}>En juin, la scène musicale locale fait la tournée des bibliothèques</p>
          <span className="inline-flex items-center" style={{ gap: '6px', fontSize: '14px', fontWeight: 600, color: '#297473' }}>En savoir plus <IconChevronRight size={16} strokeWidth={2} /></span>
        </div>
      </motion.a>
    </div>
  );
}

/* ── Agenda pills + "Tout l'agenda" ── */
const AGENDA_TOGGLES = ['À la une', 'Rencontres & Dédicaces', 'Jeunesse & Famille', 'Ateliers & Formations', 'Débats & Société', 'Accessibilité'];
function TabletAgendaPills() {
  const [activePill, setActivePill] = useState('À la une');
  return (
    <div className="flex flex-col" style={{ gap: '16px', padding: '0 16px 32px' }}>
    <h2 style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '20px', color: 'var(--color-text-brand)', margin: '0 0 4px' }}>L'agenda du réseau</h2>
      <div style={{ marginRight: '-16px' }}>
        <div className="flex overflow-x-auto items-center" style={{ gap: '8px', paddingBottom: '4px', paddingRight: '16px', scrollbarWidth: 'none' }}>
          {AGENDA_TOGGLES.map(label => {
            const active = activePill === label;
            return <button key={label} onClick={() => setActivePill(label)} className="shrink-0 inline-flex items-center justify-center font-bold cursor-pointer border-none outline-none" style={{ height: '40px', padding: '0 16px', fontSize: '14px', fontWeight: 700, borderRadius: '8px', backgroundColor: active ? '#E1F7F6' : '#F9F9FA', color: active ? '#297473' : '#656366', border: active ? '1px solid #63B5B4' : '1px solid #DAD9DB', whiteSpace: 'nowrap', transition: 'all 150ms' }}>{label}</button>;
          })}
          <button className="inline-flex items-center justify-center font-bold cursor-pointer border-none outline-none shrink-0" style={{ height: '40px', padding: '0 16px', gap: '8px', fontSize: '14px', fontWeight: 700, borderRadius: '8px', backgroundColor: '#25706F', color: 'white', boxShadow: SHADOW_NAV, whiteSpace: 'nowrap' }}>
            <IconCalendarEvent size={18} strokeWidth={2} /><span>Tout l'agenda</span><IconChevronRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 4 event cards compactes ── */
const TABLET_EVENTS = [
  { badge: 'Exposition • Mériadeck', title: 'Rencontre avec Joël Dicker', meta: 'Jeudi 4 juin à 17h30 - Mériadeck', img: '/images/event-joel-dicker.png' },
  { badge: 'Exposition • Mériadeck', title: 'Rencontre dessinée avec Véronique Tadjo', meta: 'Jeudi 4 juin à 17h30 - Mériadeck', img: '/images/event-veronique.jpg' },
  { badge: 'Exposition • Mériadeck', title: 'Révise à la bibli !', meta: 'Du 13 mai au 27 juin', img: '/images/event-revise.jpg' },
  { badge: 'Exposition • Mériadeck', title: '1001 Bornes – Joseph Le Callennec, as du crayon', meta: 'Du 27 mai au 27 juin - Mériadeck', img: '/images/event-1001bornes.jpg' },
];
function TabletAgendaEventCards() {
  return (
    <div className="flex flex-col" style={{ gap: '10px', padding: '0 16px 24px' }}>
      {TABLET_EVENTS.map((event, i) => (
        <motion.a key={i} href="#event-detail" whileTap={{ scale: 0.98 }} className="flex flex-col overflow-hidden no-underline" style={{ backgroundColor: '#FCFCFD', border: '1px solid #F1F0F1', borderRadius: '14px', boxShadow: SHADOW_CARD }} aria-label={`${event.title} — En savoir plus`}>
          <div style={{ height: '120px', position: 'relative', overflow: 'hidden', backgroundColor: '#F4D2DE' }} aria-hidden="true">
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${event.img})`, backgroundSize: 'cover', backgroundPosition: 'top' }} />
          </div>
          <div className="flex flex-col" style={{ padding: '14px', gap: '8px' }}>
            <Badge variant="default" size="medium">{event.badge}</Badge>
            <h3 style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '20px', lineHeight: '26px', color: '#222123', margin: 0 }}>{event.title}</h3>
            <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: '#656366', margin: 0 }}>{event.meta}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

/* ── Découvrir le patrimoine compact — avec image de fond comme desktop ── */
function TabletHeritageSection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '20px solid #357E7D' }}>
      {/* Image de fond avec overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="/images/heritage-bg.png" alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundColor: 'rgba(255,255,255,0.7)' }} />

      {/* Contenu */}
      <div className="flex flex-col" style={{ position: 'relative', zIndex: 2, padding: '32px 16px 40px', gap: '16px' }}>
        <h2 style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '20px', lineHeight: '26px', color: '#204140', margin: 0 }}>Découvrir le patrimoine</h2>
        <div className="flex flex-col" style={{ gap: '10px' }}>
          <motion.a href="#patrimoine-detail" whileTap={{ scale: 0.98 }} className="flex flex-col items-center no-underline" style={{ backgroundColor: '#FCFCFD', border: '1px solid #F1F0F1', borderRadius: '14px', boxShadow: SHADOW_CARD, padding: '18px', gap: '8px' }}>
            <p style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '18px', lineHeight: '120%', color: '#222123', margin: 0, textAlign: 'center' }}>Les collections</p>
            <p style={{ fontSize: '15px', fontWeight: 700, lineHeight: '22px', color: '#656366', margin: 0, textAlign: 'center' }}>patrimoniales</p>
          </motion.a>
          <motion.a href="#patrimoine-detail" whileTap={{ scale: 0.98 }} className="flex flex-col items-center no-underline" style={{ backgroundColor: '#FCFCFD', border: '1px solid #F1F0F1', borderRadius: '14px', boxShadow: SHADOW_CARD, padding: '18px', gap: '8px' }}>
            <p style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '18px', lineHeight: '120%', color: '#222123', margin: 0, textAlign: 'center' }}>Séléné</p>
            <p style={{ fontSize: '15px', fontWeight: 700, lineHeight: '22px', color: '#656366', margin: 0, textAlign: 'center' }}>la bibliothèque numérique</p>
          </motion.a>
          <motion.a href="#patrimoine-detail" whileTap={{ scale: 0.98 }} className="flex flex-col items-center no-underline" style={{ backgroundColor: '#FCFCFD', border: '1px solid #F1F0F1', borderRadius: '14px', boxShadow: SHADOW_CARD, padding: '18px', gap: '8px' }}>
            <p style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '18px', lineHeight: '120%', color: '#222123', margin: 0, textAlign: 'center' }}>Les essais</p>
            <p style={{ fontSize: '15px', fontWeight: 700, lineHeight: '22px', color: '#656366', margin: 0, textAlign: 'center' }}>de montaigne</p>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

/* ── Book carousel (sans titre "Recommandés pour vous") ── */
function TabletBookCarousel({ books }) {
  return (
    <div style={{ marginRight: '-16px', padding: '0 0 24px 16px' }}>
      <div className="flex overflow-x-auto" style={{ gap: '16px', paddingBottom: '4px', paddingRight: '16px', scrollbarWidth: 'none' }}>
        {books.map(book => (
          <motion.div key={book.id} whileTap={{ scale: 0.96 }} className="flex flex-col shrink-0" style={{ gap: '6px', width: '120px', cursor: 'pointer' }}>
            <BookCover cover={book.cover} title={book.title} style={{ width: '120px', height: '186px', borderRadius: '6px', objectPosition: 'top', boxShadow: '0px 2px 4px 0px var(--alpha-grey-10), 0px 7px 7px 0px var(--alpha-grey-09), 0px 16px 9px 0px var(--alpha-grey-05)' }} />
            <p style={{ fontSize: '14px', fontWeight: 600, lineHeight: '18px', color: 'var(--neutral-12)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</p>
            <p style={{ fontSize: '14px', fontWeight: 500, lineHeight: '18px', color: 'var(--neutral-11)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.author}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Footer avec liens ── */
const FOOTER_LINKS = [
  'Horaires', 'Nous rejoindre', 'Contact', 'Espace professionnels',
  'Plan du site', 'Mentions légales', 'Accessibilité',
];
function TabletFooter() {
  return (
    <footer style={{ padding: '24px 16px', borderTop: '1px solid var(--neutral-6)', backgroundColor: 'var(--neutral-2)' }}>
      <div className="flex flex-col items-center" style={{ gap: '12px' }}>
        <p style={{ fontSize: '12px', fontWeight: 400, lineHeight: '18px', color: '#828183', textAlign: 'center', margin: 0 }}>
          &copy; Bordeaux Métropole, 2022<br />
          Propulsé par @InMédia Technologis, 2022 et @alizéeBompanM2ECV2026
        </p>
        <div className="flex flex-wrap justify-center" style={{ gap: '8px 16px' }}>
          {FOOTER_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s/g, '-')}`} className="no-underline" style={{ fontSize: '13px', fontWeight: 500, color: '#656366', lineHeight: '20px' }}>
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}


/* ══════════════════════════════════════════════════════════════
   WEB HOME PAGE
   ══════════════════════════════════════════════════════════════ */
export default function WebHomePage() {
  const viewport = useViewport();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  if (viewport === 'tablet' || viewport === 'mobile') {
    return <TabletLayout isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen w-full" style={{ fontFamily: 'var(--font-body)', backgroundColor: '#F9F9FA', color: '#656366' }}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded focus:bg-[#25706F] focus:text-white focus:font-bold focus:no-underline">Aller au contenu</a>
      <WebHeader isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
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
  );
}