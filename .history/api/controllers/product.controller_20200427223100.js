const Product = require('../../models/products.model');

module.exports.index = async (req, res) => {
  var products = await Product.find();
  res.json(products);
};

module.exports.create = async (req, res) => {
  var products = await Product.create(req.body);
  res.json(products);
};

module.exports.getById = async (req, res) => {
  console.log(req.params.id);
  try {
    var products = await Product.find({_id: req.params.id});
    res.json({products: products[0] || {}});
  } catch(e) {
    // res.console.error(e);
    res.status(404).end(e);
  }
};
