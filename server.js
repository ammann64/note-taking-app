const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db.json');
const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) =>  {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`Note taking app listening at http://localhost:${PORT}`);
  });
  