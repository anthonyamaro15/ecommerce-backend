const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, process.env.SECRET, (error, decodedToken) => {
      if (error) {
        res.status(400).json({ errMessage: "Invalid credentials" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ errMessage: "No credentials Provided" });
  }
};
