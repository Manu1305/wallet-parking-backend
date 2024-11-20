const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/config');

passport.use(
    new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        },
        async (payload, done) => {
            try {
                const user = await User.findById(payload.id);
                if (!user) return done(null, false);
                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

const authenticate = passport.authenticate('jwt', { session: false });

module.exports = authenticate;
