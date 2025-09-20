const {
  addEmployee,
  getAllEmployees,
  getEmployee,
  editEmployee,
} = require("../models/employeesModel");

// Get all employees
async function allEmployeesGet(req, res) {
  const allEmployees = await getAllEmployees();
  res.render("allEmployees", { allEmployees: allEmployees });
}

// Create employee
async function createEmployeeGet(req, res) {
  res.render("employeeForm");
}

async function createEmployeePost(req, res) {
  const newEmployee = await addEmployee(req.body);
  console.log(newEmployee);
  res.redirect("/");
}

// Edit employee
async function editEmployeeGet(req, res) {
  const employeeId = parseInt(req.params.id);
  const employee = await getEmployee(employeeId);
  console.log(employee);
  res.render("employeeEditForm", { employee: employee });
}

async function editEmployeePost(req, res) {
  const updatedEmployee = await editEmployee(parseInt(req.params.id), req.body);
  res.json(req.body, updatedEmployee);
}

module.exports = {
  allEmployeesGet,
  createEmployeeGet,
  createEmployeePost,
  editEmployeeGet,
  editEmployeePost,
};
