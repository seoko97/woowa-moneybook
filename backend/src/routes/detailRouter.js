const express = require("express");
const detailController = require("../controllers/detailController");

const detailRouter = express.Router();

detailRouter.get("/", detailController.getDetail);

module.exports = detailRouter;
