const { addEmployee } = require("../models/employeesModel");

async function createEmployeeGet(req, res) {
  res.render("employeeForm");
}

async function createEmployeePost(req, res) {
  const newEmployee = await addEmployee(req.body);
  console.log(newEmployee);
  res.redirect("/");
}

module.exports = { createEmployeeGet, createEmployeePost };
