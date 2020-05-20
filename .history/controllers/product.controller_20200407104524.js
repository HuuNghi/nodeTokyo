const db = require('../db');

module.exports.index = (req, res) => {
  var page = req.query.page;
  var perPage = 8;

  var begin = (page - 1) * perPage;
  var end = page * perPage;
  
  var resResult = db.get('products').slice(begin, end).value();
  res.render('products/index', {
    products: resResult
  });
}
