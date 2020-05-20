module.exports.authentication = (req, res, next) => {
  var cookie = req.cookies;
  console.log(cookie);
}
