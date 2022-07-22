const express = require("express");
const historyRouter = require("./history.router");
const paymentRouter = require("./payment.router");
const analyticsRouter = require("./analyticsRouter");
const detailRouter = require("./detailRouter");

const apiRouter = express.Router();

apiRouter.use("/history", historyRouter);
apiRouter.use("/payment", paymentRouter);
apiRouter.use("/analytics", analyticsRouter);
apiRouter.use("/detail", detailRouter);

module.exports = apiRouter;
