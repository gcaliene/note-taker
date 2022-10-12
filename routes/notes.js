const fs = require('fs');
const path = require('path');
const db = './db/db.json';
const { v4: uuidv4 } = require('uuid');
const noteRoute = require('express').Router();

noteRoute.get('/', (req, res) => {
  fs.readFile(db, 'utf8', (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data))
  })
});


noteRoute.post('/', (req, res) => {
  console.log(req.body)
  const {title, text} = req.body;

  if (!title || !text) {
    throw new Error("Note title and text must be filled in!");
  } 
  
  const newNote = {title, text, id: uuidv4()};

  return fs.readFile(db, 'utf8', (err, data) => {
    if (err) throw err;
    let parsedNotes = [].concat(JSON.parse(data));
    const updatedNotes = [...parsedNotes, newNote];
    fs.writeFile(db, JSON.stringify(updatedNotes), (err, data) => {
      if (err) throw err;
      console.log('wrote to file')
      res.status(200).json({message: 'wrote to file successfully'})
    });
  })
});

noteRoute.delete('/:id', (req, res) => {
 console.log(req.query)
});

module.exports = noteRoute;