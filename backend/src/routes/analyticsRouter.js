const express = require("express");
const analyticsController = require("../controllers/analyticsController");

const paymentRouter = express.Router();

paymentRouter.get("/", analyticsController.getAnalytics);

module.exports = paymentRouter;
