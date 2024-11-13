const express = require("express")

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const userRouter = require("../src/domains/User/index");
app.use("/User", userRouter);

module.exports = app;