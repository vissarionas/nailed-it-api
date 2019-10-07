/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const Customers = require('./customers');

const app = express();
const port = process.env.PORT;

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromHeader('access_token'),
  ]),
  secretOrKey: process.env.JWT_SECRET_KEY,
}, (jwtPayload, done) => done(null, jwtPayload)));

app.use(passport.initialize());

app.get('/customers', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.send(await Customers.getCustomers());
  });

app.delete('/customers', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.send(await Customers.deleteCustomer(req.query.customerId, req.query.revision));
  });

app.listen(port, () => console.log(`Server started on http://127.0.0.1:${port}`));
