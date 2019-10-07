const express = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const app = express();

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromHeader('access_token'),
  ]),
  secretOrKey: 'secret-key',
}, (jwtPayload, done) => done(null, jwtPayload)));

app.use(passport.initialize());

const port = 3000;

app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server started on http://127.0.0.1:${port}!`));
