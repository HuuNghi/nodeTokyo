module.exports.authentication = (req, res, next) => {
  var cookie = req.cookies.userId;
  console.log(cookie);
}
