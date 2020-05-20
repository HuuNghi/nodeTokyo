const db = require('../db');

module.exports.index = (req, res) => {
  res.render('users/index', {
    users: db.get('users').value(),
    q: req.query.q,
  });
};

module.exports.search = (req, res) => {
  var q = req.query.q;
  var result = db.get('users').find({ name: q }).value();
  console.log(result);
  res.render('users/index', {
    users: result ? [result] : db.get('users').value(),
    q,
  });
};

module.exports.create = (req, res) => {
  res.render('users/create');
};
