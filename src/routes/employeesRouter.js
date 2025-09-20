const e = require("express");
const { Router } = require("express");
const {
  allEmployeesGet,
  createEmployeeGet,
  createEmployeePost,
  editEmployeeGet,
  editEmployeePost,
} = require("../controllers/employeesController");
const employeesRouter = new Router();

// Get all the employees
employeesRouter.get("/", allEmployeesGet);

// Create employee
employeesRouter.get("/create", createEmployeeGet);
employeesRouter.post("/create", createEmployeePost);

// Edit employee
employeesRouter.get("/:id/edit", editEmployeeGet);
employeesRouter.post("/:id/edit", editEmployeePost);

// Delete employee
// employeesRouter.get("/:id/delete");
// employeesRouter.post("/:id/delete");

module.exports = employeesRouter;
