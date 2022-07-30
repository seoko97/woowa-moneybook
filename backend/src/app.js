const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const apiRouter = require("./routes/apiRouter");

const app = express();

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", apiRouter);

module.exports = app;
