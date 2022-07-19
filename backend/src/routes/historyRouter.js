const express = require("express");
const todoController = require("../controllers/historyController");

const historyRouter = express.Router();

historyRouter.post("/", todoController.createHistory);

historyRouter.get("/", todoController.getHistory);

historyRouter.patch("/", todoController.updateHistory);

module.exports = historyRouter;
