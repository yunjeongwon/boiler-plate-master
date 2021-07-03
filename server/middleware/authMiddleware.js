const User = require("../models/User");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if (err) return console.log(err);
    if (!user) return res.json({ isAuth: false });
    req.user = user;
    req.token = token;
    next();
  });
};

module.exports = authMiddleware;
