/**
 * Catalogue de livres — version web Bibliothèques de Bordeaux
 * Couvertures : Open Library (https://covers.openlibrary.org)
 * Genres variés : Roman, SF, Fantastique, Polar, BD, Poésie, Théâtre, Histoire, Jeunesse, Philosophie
 */

const cover = (isbn) =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`

export const BOOKS = [
  /* ── Romans classiques ── */
  {
    id: 1,
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    cover: cover('9782070408504'),
    genres: ['Jeunesse', 'Classique', 'Philosophie'],
    rating: 4.8,
    isbn: '9782070408504',
  },
  {
    id: 2,
    title: "L'Étranger",
    author: 'Albert Camus',
    cover: cover('9782070360024'),
    genres: ['Roman', 'Philosophie', 'Classique'],
    rating: 4.6,
    isbn: '9782070360024',
  },
  {
    id: 3,
    title: 'Madame Bovary',
    author: 'Gustave Flaubert',
    cover: cover('9782070411986'),
    genres: ['Roman', 'Classique'],
    rating: 4.4,
    isbn: '9782070411986',
  },
  {
    id: 4,
    title: 'Les Misérables',
    author: 'Victor Hugo',
    cover: cover('9782253096344'),
    genres: ['Roman', 'Classique', 'Historique'],
    rating: 4.7,
    isbn: '9782253096344',
  },
  {
    id: 5,
    title: 'À la recherche du temps perdu',
    author: 'Marcel Proust',
    cover: cover('9782070763085'),
    genres: ['Roman', 'Classique', 'Autobiographique'],
    rating: 4.5,
    isbn: '9782070763085',
  },

  /* ── Science-fiction & Fantastique ── */
  {
    id: 6,
    title: '1984',
    author: 'George Orwell',
    cover: cover('9782070401437'),
    genres: ['Science-fiction', 'Politique', 'Dystopie'],
    rating: 4.7,
    isbn: '9782070401437',
  },
  {
    id: 7,
    title: 'Le Meilleur des mondes',
    author: 'Aldous Huxley',
    cover: cover('9782253006671'),
    genres: ['Science-fiction', 'Dystopie', 'Philosophie'],
    rating: 4.5,
    isbn: '9782253006671',
  },
  {
    id: 8,
    title: 'La Planète des singes',
    author: 'Pierre Boulle',
    cover: cover('9782253006718'),
    genres: ['Science-fiction', 'Aventure', 'Polar'],
    rating: 4.3,
    isbn: '9782253006718',
  },
  {
    id: 9,
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    cover: cover('9782070415731'),
    genres: ['Science-fiction', 'Dystopie', 'Classique'],
    rating: 4.4,
    isbn: '9782070415731',
  },
  {
    id: 10,
    title: 'Harry Potter à l\'école des sorciers',
    author: 'J.K. Rowling',
    cover: cover('9782070643028'),
    genres: ['Fantastique', 'Jeunesse', 'Aventure'],
    rating: 4.9,
    isbn: '9782070643028',
  },

  /* ── Polars & Thrillers ── */
  {
    id: 11,
    title: "L'Armée des ombres",
    author: 'Joseph Kessel',
    cover: cover('9782266192651'),
    genres: ['Polar', 'Historique', 'Guerre'],
    rating: 4.6,
    isbn: '9782266192651',
  },
  {
    id: 12,
    title: 'Le Chien des Baskerville',
    author: 'Arthur Conan Doyle',
    cover: cover('9782070401413'),
    genres: ['Polar', 'Classique', 'Mystère'],
    rating: 4.3,
    isbn: '9782070401413',
  },
  {
    id: 13,
    title: 'Millénium — Les hommes qui n\'aimaient pas les femmes',
    author: 'Stieg Larsson',
    cover: cover('9782744107779'),
    genres: ['Polar', 'Thriller', 'Nordique'],
    rating: 4.5,
    isbn: '9782744107779',
  },
  {
    id: 14,
    title: 'Le Crime de l\'Orient-Express',
    author: 'Agatha Christie',
    cover: cover('9782253005926'),
    genres: ['Polar', 'Classique', 'Enquête'],
    rating: 4.4,
    isbn: '9782253005926',
  },

  /* ── Bande dessinée & Graphique ── */
  {
    id: 15,
    title: 'Astérix le Gaulois',
    author: 'René Goscinny / Albert Uderzo',
    cover: cover('9782012101470'),
    genres: ['BD', 'Humour', 'Aventure'],
    rating: 4.7,
    isbn: '9782012101470',
  },
  {
    id: 16,
    title: 'Le Lotus bleu',
    author: 'Hergé',
    cover: cover('9782203012372'),
    genres: ['BD', 'Aventure', 'Classique'],
    rating: 4.8,
    isbn: '9782203012372',
  },
  {
    id: 17,
    title: 'Persepolis',
    author: 'Marjane Satrapi',
    cover: cover('9782844140588'),
    genres: ['BD', 'Autobiographique', 'Historique'],
    rating: 4.6,
    isbn: '9782844140588',
  },

  /* ── Récits contemporains & Prix littéraires ── */
  {
    id: 18,
    title: "L'Élégance du hérisson",
    author: 'Muriel Barbery',
    cover: cover('9782070788507'),
    genres: ['Roman', 'Contemporain', 'Philosophie'],
    rating: 4.2,
    isbn: '9782070788507',
  },
  {
    id: 19,
    title: 'Le Château de ma mère',
    author: 'Marcel Pagnol',
    cover: cover('9782877062208'),
    genres: ['Roman', 'Autobiographique', 'Classique'],
    rating: 4.6,
    isbn: '9782877062208',
  },
  {
    id: 20,
    title: 'La Horde du Contrevent',
    author: 'Alain Damasio',
    cover: cover('9782370560070'),
    genres: ['Science-fiction', 'Aventure', 'Fantastique'],
    rating: 4.7,
    isbn: '9782370560070',
  },
  {
    id: 21,
    title: 'Vernon Subutex (Tome 1)',
    author: 'Virginie Despentes',
    cover: cover('9782246857967'),
    genres: ['Roman', 'Contemporain', 'Société'],
    rating: 4.3,
    isbn: '9782246857967',
  },
  {
    id: 22,
    title: 'Les Bienveillantes',
    author: 'Jonathan Littell',
    cover: cover('9782070359172'),
    genres: ['Roman', 'Historique', 'Guerre'],
    rating: 4.4,
    isbn: '9782070359172',
  },

  /* ── Poésie & Théâtre ── */
  {
    id: 23,
    title: 'Les Fleurs du mal',
    author: 'Charles Baudelaire',
    cover: cover('9782070411535'),
    genres: ['Poésie', 'Classique', 'Romantisme'],
    rating: 4.6,
    isbn: '9782070411535',
  },
  {
    id: 24,
    title: 'Cyrano de Bergerac',
    author: 'Edmond Rostand',
    cover: cover('9782070411801'),
    genres: ['Théâtre', 'Classique', 'Romance'],
    rating: 4.7,
    isbn: '9782070411801',
  },
  {
    id: 25,
    title: 'En attendant Godot',
    author: 'Samuel Beckett',
    cover: cover('9782707301486'),
    genres: ['Théâtre', 'Philosophie', 'Absurde'],
    rating: 4.2,
    isbn: '9782707301486',
  },
]

/**
 * Genres disponibles (pour filtres)
 */
export const GENRES = [
  'Roman',
  'Classique',
  'Science-fiction',
  'Fantastique',
  'Polar',
  'BD',
  'Théâtre',
  'Poésie',
  'Jeunesse',
  'Aventure',
  'Historique',
  'Philosophie',
  'Dystopie',
  'Contemporain',
  'Humour',
]
