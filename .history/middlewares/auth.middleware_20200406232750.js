module.exports.authentication = (req, res, next) => {
  var cookie = req.req.cookies;
  console.log(cookie);
}
