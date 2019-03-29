const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Superuser = mongoose.model("superusers");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Superuser.findById(jwt_payload.id)
        .then(superuser => {
          if (superuser) {
            return done(null, superuser);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
