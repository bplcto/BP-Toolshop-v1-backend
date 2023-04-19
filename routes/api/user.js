const express = require('express');
const userRouter = express.Router();

const { fetchUsers, changeUserStatus, forgotPassword } = require('../../controller/user');
const { resetPassword } = require('../../controller/auth');

userRouter.get('/', fetchUsers);
userRouter.get('/resetPassword/:userid', resetPassword);
userRouter.get('/changeStatus/:userid', changeUserStatus);
userRouter.post('/forgotPassword', forgotPassword);

module.exports = userRouter;
