const db = require('../db');
const Product = require('../models/products.model');

module.exports.index = async (req, res) => {
  // var page = req.query.page;
  // if (!page) {
  //   page = 1;
  // }
  // var perPage = 8;

  // var begin = (page - 1) * perPage;
  // var end = page * perPage;

  // var totalPage = calculatorPagination(page, perPage);
  // var pagination = {
  //   totalPage,
  //   currentPage: page,
  // };
  
  // var resResult = db.get('products').slice(begin, end).value();
  // res.render('products/index', {
  //   products: resResult,
  //   pagination
  // });
  var products = await Product.find();
  res.json(products);
}

function calculatorPagination(page, perPage) {
  return Math.floor(page/perPage) + 1;
}
