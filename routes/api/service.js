const express = require('express');
const serviceRouter = express.Router();

const { service } = require('../../controller/service');

serviceRouter.get('/', service);

module.exports = serviceRouter;
