const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

console.log("config passport");

const option = {};
option.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
option.secretOrKey = "secret";

passport.use(
  new JwtStrategy(option, (jwt_payload, done) => {
    const user = { id: jwt_payload.id };
    return done(null, user);
  })
);

module.exports = {};
