var express = require('express');
var DB = require('../db')();

var router = express.Router();

//------------------------------------------------------------------------------
// Add

// GET - Render page with definition add form
router.get('/add', function (req, res) {
  res.render('main', { page: 'definition/add.ejs' });
});

// POST - Add definition to the DB with name and text in the req body
router.post('/add', async function (req, res) {
  var name = req.body.name
  var text = req.body.text
  await DB.definitionAdd(name, text);
  res.redirect('/definition');
});

//------------------------------------------------------------------------------
// Edit

// GET - Render page with definition edit form for definition identified by ID
router.get('/edit/:ID', async function (req, res) {
  var id = req.params.ID;
  const def = await DB.definitionGetOne(id);
  res.render('main', { page: 'definition/edit.ejs', def: def });
});

// POST - Edit definition identified by ID with name and text in the req body
router.post('/edit/:ID', async function (req, res) {
  var id = req.params.ID;
  var name = req.body.name
  var text = req.body.text
  await DB.definitionEdit(id, name, text);
  res.redirect('/definition');
});

//------------------------------------------------------------------------------
// Get

// GET - Render page with all definitions
router.get('/', async function(req, res) {
  var defs = await DB.definitionGetAll();
  res.render('main', { page: 'definitions.ejs', definitions: defs });
});

//------------------------------------------------------------------------------
// Remove

// POST - Remove definition identified by ID
router.post('/remove/:ID', async function (req, res) {
  var id = req.params.ID;
  await DB.definitionRemove(id);
  res.redirect('/definition');
});

//------------------------------------------------------------------------------

module.exports = router;
