// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const User = require("../models/user.model");
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
// const dotenv = require("dotenv");
// // configure dotenv to access environment variables
// dotenv.config();

// const JWTSecretKey = process.env.JWT_SECRET_KEY;

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// exports.getToken = function(user) {
//   return jwt.sign(user, JWTSecretKey, { expiresIn: 864000 });
// };

// var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = JWTSecretKey;

// exports.jwtPassport = passport.use(
//   new JwtStrategy(opts, (jwt_payload, done) => {
//     console.log("JWT payload: ", jwt_payload);
//     User.findOne({ _id: jwt_payload._id }, (err, user) => {
//       if (err) {
//         return done(err, false);
//       } else if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     });
//   })
// );

// exports.verifyUser = passport.authenticate("jwt", { session: false });

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user.model");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
