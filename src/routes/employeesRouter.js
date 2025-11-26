const e = require("express");
const { Router } = require("express");
const {
  allEmployeesGet,
  createEmployeeGet,
  createEmployeePost,
  editEmployeeGet,
  editEmployeePost,
  deleteEmployeePost,
  employeeGet,
} = require("../controllers/employeesController");
const employeesRouter = new Router();

// Get all the employees
employeesRouter.get("/", allEmployeesGet);

// Create employee
employeesRouter.get("/create", createEmployeeGet);
employeesRouter.post("/create", createEmployeePost);

// Get employee
employeesRouter.get("/:id", employeeGet);

// Edit employee
employeesRouter.get("/:id/edit", editEmployeeGet);
employeesRouter.post("/:id/edit", editEmployeePost);

// Delete employee
employeesRouter.post("/:id/delete", deleteEmployeePost);

module.exports = employeesRouter;
