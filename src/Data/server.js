const express = require('express');
const cors = require('cors');

const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 5223;

// Create or open the SQLite database
const db = new sqlite3.Database('SQLite.db');

db.run(`
  CREATE TABLE IF NOT EXISTS NewsArticles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    publisher TEXT NOT NULL,
    date TEXT NOT NULL
  )
`);

// Set up Express to handle JSON requests
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send("Welcome to the Server!"); // welcome_msg
})

app.get('/api/articles', (req, res) => {
  db.all('SELECT * FROM NewsArticles', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({'Message': err.message});
    }
    res.json({
      'Message': "Successfully retrieve articles", // retrieve_articles_success_msg
      'Articles': rows
    });
  });
});

app.post('/api/articles', (req, res) => {
  const { title, summary, publisher, date } = req.body;
  db.run(`INSERT INTO NewsArticles (title, summary, publisher, date) VALUES (?, ?, ?, ?)`,
    [ title, summary, publisher, date ],
    (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({'Message': err.message});
      }
    })
  console.log("Added article: ", { title, summary, publisher, date });
  res.json({
    'Message': "Successfully created article", // create_article_success_msg
    'Article': {
      'title': title,
      'summary': summary,
      'publisher': publisher,
      'date': date
    }
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
