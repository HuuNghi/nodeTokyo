const db = require('../db');

module.exports.index = (req, res) => {
  var page = req.query.page;
  if (!page) {
    page = 1;
  }
  var perPage = 8;

  var begin = (page - 1) * perPage;
  var end = page * perPage;

  var totalPage = calculatorPagination(page, perPage);
  
  var resResult = db.get('products').slice(begin, end).value();
  res.render('products/index', {
    products: resResult
  });
}

function calculatorPagination(page, perPage) {
  return Math.floor(page/perPage) + 1;
}
