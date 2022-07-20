const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { historyController } = require('../controllers/history.controller');

const historyRouter = express.Router();

// historyRouter.get('/', asyncHandler(historyController.getHistories));
historyRouter.post('/', asyncHandler(historyController.createHistory));

module.exports = historyRouter;
