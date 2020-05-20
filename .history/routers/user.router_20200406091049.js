const express = require('express');
const router = express.Router();
router.get('', (req, res) => {
  res.render('users/index', {
    users: db.get('users').value(),
    q: req.query.q
  });
});

router.get('/search', (req, res) => {
  var q = req.query.q;
  var result = db.get('users').find({name: q}).value();
  console.log(result);
  res.render('users/index', {
    users: result ? [result] : db.get('users').value(),
    q
  });
});

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
