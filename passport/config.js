const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const axiosClient = require("../api");
const userModel = require("../database/schema/user");

const configPassport = (passport) => {
  // Config for Jwtstrategy
  const option = {};
  option.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  option.secretOrKey = "secret";

  passport.use(
    new JwtStrategy(option, (jwt_payload, done) => {
      const user = { id: jwt_payload.id };
      return done(null, user);
    })
  );

  // Config for FB strategy
  // passport.use(
  //   new FacebookStrategy(
  //     {
  //       clientID: "354123862358808",
  //       clientSecret: "b5e45666544c5c686f0242ce456056f2",
  //       callbackURL: "http://localhost:3000/auth/facebook/callback",
  //     },
  //     async function (accessToken, refreshToken, profile, cb) {
  //       const url = `/${profile.id}`;

  //       try {
  //         const result = await axiosClient.post(url, {
  //           fields: "email",
  //           access_token: `${accessToken}`,
  //         });

  //         const { email } = result;
  //         const { displayName: fullName } = profile;

  //         // Create user if not exist
  //         const user = await userModel.findOne({ email });

  //         if (!user) {
  //           const newUser = await new userModel({
  //             email,
  //             fullName,
  //           }).save();

  //           return cb(null, { id: newUser._id });
  //         }

  //         return cb(null, { id: user._id });
  //       } catch (e) {
  //         console.log(e.message);
  //         return cb(e, null);
  //       }
  //     }
  //   )
  // );

  // // Config for GG strategy
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID:
  //         "860222154086-lbnk9pk8euko7mtnhu3kpskrs3mgn3bf.apps.googleusercontent.com",
  //       clientSecret: "XVRlIEJTiXeZV855Pbw8mgeL",
  //       callbackURL: "http://localhost:3000/auth/google/callback",
  //     },
  //     async function (token, tokenSecret, profile, cb) {
  //       const { email, name: fullName } = profile._json;

  //       // Create user if not exist
  //       const user = await userModel.findOne({ email });

  //       if (!user) {
  //         const newUser = await new userModel({
  //           email,
  //           fullName,
  //         }).save();

  //         return cb(null, { id: newUser._id });
  //       }

  //       return cb(null, { id: user._id });
  //     }
  //   )
  // );
};

module.exports = { configPassport };
