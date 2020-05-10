const jwt = require("jsonwebtoken");


// function to handle authorization
const authorize = (role, key) => (request, response, next) => {
  // verify if token exist
  const token = request.headers["authorization"];

  if (!token) {
    return next({ status: 401, message: "You are not login" });
  }
  
  try {
    // verify token
    const payload = jwt.verify(token, key);
    request.user = payload;
    
    // verify admin
    if (role && request.user.role) {
      next({ status: 403 });
      return;
    }
    
    next();
  } catch (err) {
    return next({ status: 401, message: "token has expired" });
  }
};
// end of function

module.exports = {
  authorize,
};
