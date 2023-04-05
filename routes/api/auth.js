const express = require("express");
const { check } = require('express-validator');

const authRouter = express.Router();

const { test, login, register } = require("../../controller/auth");

authRouter.get("/test", test);
authRouter.post(
  "/login", 
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  login
);
authRouter.post(
  '/register',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  register
)

module.exports =  authRouter;
