const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    user: user.email,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.SECRET, options);
}

module.exports = {
  generateToken,
};
