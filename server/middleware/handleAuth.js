const jwt = require("jsonwebtoken");

// function to handle authorization
const authorize = (role, key) => (request, response, next) => {
  // verify if header exist
  if (!request.headers.authorization) {
    return next({
      status: 401,
      message: "Auth request missing authorization header or token",
    });
  }

  // get token from header
  const token = request.headers["authorization"].split(":")[1].trim();

  // verify if token exist
  if (!token || null) {
    return next({
      status: 401,
      message: "Auth request missing authorization header or token",
    });
  }

  try {
    // verify token
    const payload = jwt.verify(token, key);
    request.user = payload.user;

    // verify admin
    if (role && !request.user.isAdmin) {
      next({ status: 403, message: "not admin" });
      return;
    }

    next();
  } catch (err) {
    return next({ status: 401, message: "token has expired" });
  }
};
// end of function

module.exports = authorize;
