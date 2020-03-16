const config = require("config");
const jwt = require("jsonwebtoken");

//Create a middleware function, you pass in 3 things: the request, the response and next. When you are done with what this middleware ddoes you call next to move on to the next middleware. The purpose of this function is to get the token sent from either React or Postman or Angular or whatever front end. They will send along a token in the header. Header values are in request
function auth(req, res, next) {
  //Set the header name
  const token = req.header("x-auth-token");

  //Check for token, send unauthorised response if not there.
  if (!token)
    return res.status(401).json({ msg: "No token, authorisation denied" });

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded; //Add user from payload
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
