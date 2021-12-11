require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { v4: uuid } = require('uuid');
uuid();

const User = require("../model/user.model");
const { newToken } = require("../controller/auth.controller");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:1234/auth/google/callback",
      userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log(profile)
      let user = await User.findOne({ email: profile?._json?.email })
        .lean()
        .exec();

      if (!user) {
        user = await User.create({
          name:profile?._json?.name,
          email: profile?._json?.email,
          password: uuid(),
          role:"seller",
        });
      }
      const token = newToken(user);
      return done(null, { user, token });
    }
  )
);

module.exports = passport;
