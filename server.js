const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const noteData = require('./db/db.json');
const dbPath = './db/db.json';
const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile(dbPath, (err, data) => {
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => { 

    const {title, text} = req.body;
    const id = uniqid();
    if (title && text && id) {

        const newNote = {
            title: title,
            text: text,
            id: id
        };
        const response = {
            status: 'success',
            body: newNote
        };
    

        fs.readFile(dbPath, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedReviews = JSON.parse(data);
                
                parsedReviews.push(newNote);

                fs.writeFile(dbPath,
                    JSON.stringify(parsedReviews, null, 4),
                    writeErr => writeErr ? console.error(writeErr) : console.log('Added new note!'));
            }
        });

        console.log(response);
        res.status(201).json(response);

    } else {
        console.log('error');
        res.status(500).json('Error in posting review');
    };
    
});

app.get('*', (req, res) =>  {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.listen(PORT, () => {
    console.log(`Note taking app listening at http://localhost:${PORT}`);
  });
  