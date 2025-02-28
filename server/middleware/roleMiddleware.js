const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "User is not logged in" });
      }
      let hasRole = false;
      const { roles: userRoles } = jwt.verify(token, secret);

      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "User is not logged in" });
    }
  };
};
