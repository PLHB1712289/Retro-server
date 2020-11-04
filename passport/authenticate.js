const passport = require("passport");

const authenticate = (req, res, next) => {
  return passport.authenticate("jwt", { session: false });
};

module.exports = authenticate;
