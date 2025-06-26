const { User } = require("../models/User");

let auth = async (req, res, next) => {
  try {
    const token = req.cookies.x_auth;
    if (!token)
      return res.status(401).json({ isAuth: false, message: "No token" });

    const user = await User.findByToken(token);
    if (!user)
      return res.status(401).json({ isAuth: false, message: "User not found" });

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ isAuth: false, message: "Auth failed", error: err.message });
  }
};

module.exports = { auth };
