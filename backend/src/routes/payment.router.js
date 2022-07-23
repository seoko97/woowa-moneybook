const express = require("express");
const { paymentController } = require("../controllers/payment.controller");
const asyncHandler = require("../utils/asyncHandler");

const paymentRouter = express.Router();

paymentRouter.post("/", asyncHandler(paymentController.createUserPayment));

paymentRouter.get("/", asyncHandler(paymentController.getPaymentList));

paymentRouter.delete("/", asyncHandler(paymentController.deletePayment));

module.exports = paymentRouter;
