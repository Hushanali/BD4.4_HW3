const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.4 HW3 Template' });
});

// 1
async function fetchAllBooks() {
  let query = 'SELECT id, title, author FROM books';
  let result = await db.all(query, []);

  return { books: result };
}

app.get('/books', async (req, res) => {
  try {
    let response = await fetchAllBooks();

    if (response.books.length === 0) {
      return res.status(404).json({ message: 'No books found.' });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2
async function fetchBooksByAuthor(author) {
  let query = 'SELECT id, title, author, year FROM books WHERE author = ?';
  let result = await db.all(query, [author]);

  return { books: result };
}

app.get('/books/author/:author', async (req, res) => {
  try {
    let author = req.params.author;
    let response = await fetchBooksByAuthor(author);

    if (response.books.length === 0) {
      return res.status(404).json({ message: 'No books found by' + author });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3
async function fetchBooksByGenre(genre) {
  let query = 'SELECT id, title, author, genre FROM books WHERE genre = ?';
  let result = await db.all(query, [genre]);

  return { books: result };
}

app.get('/books/genre/:genre', async (req, res) => {
  try {
    let genre = req.params.genre;
    let response = await fetchBooksByGenre(genre);

    if (response.books.length === 0) {
      return res.status(404).json({ message: 'No books found by' + genre });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4
async function fetchBooksByYear(year) {
  let query = 'SELECT id, title, author, genre, year FROM books WHERE year = ?';
  let result = await db.all(query, [year]);

  return { books: result };
}

app.get('/books/year/:year', async (req, res) => {
  try {
    let year = req.params.year;
    let response = await fetchBooksByYear(year);

    if (response.books.length === 0) {
      return res.status(404).json({ message: 'No books found by' + year });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PORT
app.listen(PORT, () => {
  console.log('Server is running on Port 3000');
});
