/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const _tokenManager = {};

_tokenManager.authenticate = async (req, res, next) => {
  let token = getToken(req);
  //verify if authenticated user.
  const secret = process.env.JWT_SECRET || "Development";
  jwt.verify(token, secret, (err, decoded) => {
    if (decoded) {
      req.user_id = decoded._id;
      req.role = decoded.role;
      next();
    } else {
      res.json({
        success: false,
        message: "Invalid token"
      });
    }
  });
};

const getToken = function(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Handle token presented as a Bearer token in the Authorization header
    return req.headers.authorization.split(" ")[1];
  }
  // If we return null, we couldn't find a token.
  // In this case, the JWT middleware will return a 401 (unauthorized)
  // to the client for this request
  return null;
};

module.exports = _tokenManager;
