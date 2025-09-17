const e = require("express");
const { Router } = require("express");
const {
  createEmployeeGet,
  createEmployeePost,
} = require("../controllers/employeesController");
const employeesRouter = new Router();

// Get all the employees

// Create employee
employeesRouter.get("/create", createEmployeeGet);
employeesRouter.post("/create", createEmployeePost);

// Edit employee

// Delete employee

module.exports = employeesRouter;
