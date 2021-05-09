const jwt = require("jsonwebtoken");

// method to handle authorization
const authorize = (role, key) => (request, response, next) => {

  try {

    const token = validateHeader(request)

    if (!token) {
      next({
        status: 401,
        message: "Unauthorized : Request missing authorization header or token",
      });
    }

    // verify token

    const payload = jwt.verify(token, key);

    if (key === process.env.JWT_CONFIRMATION) {

      request.contact = payload.contact


    }
    else {

      request.user = payload.user;

      // verify admin
      if (role && !request.user.isAdmin) {
        next({ status: 403, message: "Access Denied : Not Admin" });
        return;
      }

    }


    next();
  } catch (err) {
    const message = process.env.JWT_CONFIRMATION ? "Confirmation code has expired" : "Please login to continue";
    next({ message });
  }
};
// end of method

const validateHeader = (request) => {

  // verify if header exist
  if (!request.headers.authorization) {
    return null
  }
  // get token from header
  const token = request.headers["authorization"].split(":")[1].trim();

  // verify if token exist
  if (token === "null") {
    return null
  }
  return token

}



module.exports = authorize;
