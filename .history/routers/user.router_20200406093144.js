const express = require('express');
const shortid = require('shortid');
const db = require('../db');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);

router.get('/create', (req, res) => {
  res.render('users/create');
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  var user = db.get('users').find({ id }).value();
  res.render('users/view', { user });
});

router.post('/create', (req, res) => {
  var name = req.body.name;
  if (name) {
    db.get('users').push({
      id: shortid.generate(),
      name
    }).write();
  }
  res.redirect('/users')
});

module.exports = router;
