const express = require("express");
const historyRouter = require("./historyRouter");
const paymentRouter = require("./paymentRouter");
const analyticsRouter = require("./analyticsRouter");
const detailRouter = require("./detailRouter");

const apiRouter = express.Router();

apiRouter.use("/history", historyRouter);
apiRouter.use("/payment", paymentRouter);
apiRouter.use("/analytics", analyticsRouter);
apiRouter.use("/detail", detailRouter);

module.exports = apiRouter;
