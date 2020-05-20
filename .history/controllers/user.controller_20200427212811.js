const db = require('../db');
const shortid = require('shortid');
require('../models/users.model');

module.exports.index = (req, res) => {
  // res.render('users/index', {
  //   users: db.get('users').value(),
  //   q: req.query.q,
  // });
};

module.exports.search = (req, res) => {
  var q = req.query.q;
  var result = db.get('users').value().filter((user) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  console.log(result);
  res.render('users/index', {
    users: result ? result : db.get('users').value(),
    q,
  });
};

module.exports.createView = (req, res) => {
  res.render('users/create');
};

module.exports.create = (req, res) => {
  req.body.id = shortid.generate();

  db.get('users').push(req.body).write();
  res.redirect('/users')
};

module.exports.view = (req, res) => {
  var id = req.params.id;
  var user = db.get('users').find({ id }).value();
  res.render('users/view', { user });
};
