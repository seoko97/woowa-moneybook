const express = require("express");
const paymentController = require("../controllers/paymentController");

const paymentRouter = express.Router();

paymentRouter.post("/", paymentController.createPayment);

paymentRouter.get("/", paymentController.getPayment);

paymentRouter.delete("/", paymentController.deletePayment);

module.exports = paymentRouter;
