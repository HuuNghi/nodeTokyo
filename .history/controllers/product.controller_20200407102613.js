const db = require('../db');

module.exports.index = (req, res) => {
  res.render('products/index');
}
