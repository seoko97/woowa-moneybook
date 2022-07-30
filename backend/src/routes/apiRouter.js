const express = require("express");
const historyRouter = require("./history.router");
const paymentRouter = require("./payment.router");
const analyticsRouter = require("./analytics.router");

const apiRouter = express.Router();

apiRouter.use("/history", historyRouter);
apiRouter.use("/payment", paymentRouter);
apiRouter.use("/analytics", analyticsRouter);

module.exports = apiRouter;
