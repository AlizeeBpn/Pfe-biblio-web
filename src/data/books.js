/**
 * Catalogue de livres — version web uniquement
 * Couvertures : Open Library (https://covers.openlibrary.org)
 */

const cover = (isbn) =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`

export const BOOKS = [
  {
    id: 1,
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    cover: cover('9782070408504'),
    genres: ['Jeunesse', 'Classique', 'Roman'],
    rating: 4.8,
    isbn: '9782070408504',
  },
  {
    id: 2,
    title: "L'Étranger",
    author: 'Albert Camus',
    cover: cover('9782070360024'),
    genres: ['Roman', 'Philosophie'],
    rating: 4.6,
    isbn: '9782070360024',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    cover: cover('9782070401437'),
    genres: ['Science-fiction', 'Politique'],
    rating: 4.7,
    isbn: '9782070401437',
  },
  {
    id: 4,
    title: 'La Peste',
    author: 'Albert Camus',
    cover: cover('9782070401420'),
    genres: ['Roman', 'Philosophie'],
    rating: 4.5,
    isbn: '9782070401420',
  },
  {
    id: 5,
    title: 'Madame Bovary',
    author: 'Gustave Flaubert',
    cover: cover('9782070411986'),
    genres: ['Roman', 'Classique'],
    rating: 4.4,
    isbn: '9782070411986',
  },
]
