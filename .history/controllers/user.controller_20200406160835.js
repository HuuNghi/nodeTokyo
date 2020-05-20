const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
  res.render('users/index', {
    users: db.get('users').value(),
    q: req.query.q,
  });
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
  var name = req.body.name;
  var name = req.body.phone;
  if (name) {
    db.get('users').push({
      id: shortid.generate(),
      name,
      phone,
    }).write();
  }
  res.redirect('/users')
};

module.exports.view = (req, res) => {
  var id = req.params.id;
  var user = db.get('users').find({ id }).value();
  res.render('users/view', { user });
};
