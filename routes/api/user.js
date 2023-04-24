const express = require('express');
const userRouter = express.Router();

const { fetchUsers, changeUserStatus, forgotPassword, changePassword } = require('../../controller/user');
const { resetPassword } = require('../../controller/auth');

userRouter.get('/', fetchUsers);
userRouter.get('/resetPassword/:userid', resetPassword);
userRouter.get('/changeStatus/:userid', changeUserStatus);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.post('/changePassword', changePassword);

module.exports = userRouter;
