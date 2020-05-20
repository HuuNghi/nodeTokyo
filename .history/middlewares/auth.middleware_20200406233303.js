const db = require('../db');

module.exports.authentication = (req, res, next) => {
  var cookie = req.cookies.userId;
  if (!cookie) {
    res.redirect('/auth/login');
    return;
  }

  var user = db.get('users').find({id: cookie}).value();

  if (!user) {
    res.redirect('/auth/login');
    return;
  }

  next();

}
