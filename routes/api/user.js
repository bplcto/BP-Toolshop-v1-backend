const express = require('express');
const userRouter = express.Router();

const { fetchUsers, changeUserStatus } = require('../../controller/user');
const { resetPassword } = require('../../controller/auth');

userRouter.get('/', fetchUsers);
userRouter.get('/resetPassword/:userid', resetPassword);
userRouter.get('/changeStatus/:userid', changeUserStatus);

module.exports = userRouter;
