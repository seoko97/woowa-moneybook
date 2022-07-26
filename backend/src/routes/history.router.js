const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { historyController } = require("../controllers/history.controller");

const historyRouter = express.Router();

historyRouter.get("/", asyncHandler(historyController.getHistoryList));
historyRouter.post("/", asyncHandler(historyController.createHistory));
historyRouter.patch("/", asyncHandler(historyController.updateHistory));
historyRouter.delete("/", asyncHandler(historyController.deleteHistory));

module.exports = historyRouter;
