/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
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
}, (payload, done) => done(null, payload)));

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/customers', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      res.send(await Customers.getCustomers());
    } catch (error) {
      res.send(error);
    }
  });

app.post('/customers', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      res.send(await Customers.saveCustomer(req.body));
    } catch (error) {
      res.send(error);
    }
  });

app.put('/customers', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      res.send(await Customers.updateCustomer(req.body));
    } catch (error) {
      res.send(error);
    }
  });

app.delete('/customers/:id/:rev', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      res.send(await Customers.deleteCustomer(req.params.id, req.params.rev));
    } catch (error) {
      res.send(error);
    }
  });

app.listen(port, () => console.log(`Server started on http://127.0.0.1:${port}`));
