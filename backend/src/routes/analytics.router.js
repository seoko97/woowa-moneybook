const express = require("express");
const { analyticsController } = require("../controllers/analytics.controller");
const asyncHandler = require("../utils/asyncHandler");

const detailRouter = express.Router();

detailRouter.get(
  "/",
  asyncHandler(analyticsController.getTotalExpenditureList)
);

module.exports = detailRouter;
