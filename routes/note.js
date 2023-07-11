var express = require('express');
var DB = require('../db')();

var router = express.Router();

//------------------------------------------------------------------------------
// Add

// POST - Add note to the DB with name in the req body and empty text
router.post('/add', async function (req, res) {
  var name = req.body.name
  var id = await DB.noteAdd(name, "");
  res.redirect('/note/' + id); 
});

//------------------------------------------------------------------------------
// Edit

// POST - Edit note identified by ID with name and text in the req body
router.post('/:ID', async function (req, res) {
  var id = req.params.ID;
  var name = req.body.name
  var text = req.body.text
  await DB.noteEdit(id, name, text);
  res.send("");
});

//------------------------------------------------------------------------------
// Get

// GET - Get all the notes in DB, sent as JSON object
router.get('/', async function (req, res) {
  const notes = await DB.noteGetAll();
  res.send(notes);
});

// GET - Render page with note identified by ID
router.get('/:ID', async function (req, res) {
  var id = req.params.ID;
  const note = await DB.noteGetOne(id);
  res.render('main', { page: 'note/edit.ejs', note: note });
});

//------------------------------------------------------------------------------
// Remove

// POST - Remove note identified by ID
router.post('/remove/:ID', async function (req, res) {
  var id = req.params.ID;
  await DB.noteRemove(id);
  res.redirect('/');
});

module.exports = router;
