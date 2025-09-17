const { Router } = require("express");
const { payrollGet, payrollPost } = require("../controllers/payrollController");
const payrollRouter = new Router();

payrollRouter.get("/", payrollGet);
payrollRouter.post("/", payrollPost);

module.exports = payrollRouter;
