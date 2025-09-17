const { getAllEmployees, getEmployee } = require("../models/employeesModel");

async function payrollGet(req, res) {
  const allEmployees = await getAllEmployees();
  res.render("payroll", { allEmployees: allEmployees, employee: null });
}

async function payrollPost(req, res) {
  const { employeeId } = req.body;
  const employee = await getEmployee(parseInt(employeeId));
  console.log(employee);
  // Antique value
  const percent = employee.antique * 0.05;
  const antiqueValue = Math.round(employee.basicSalary * percent * 100) / 100;

  // High school value
  let highSchoolValue = 0;
  if (employee.highSchool) {
    highSchoolValue =
      Math.round((employee.basicSalary + antiqueValue) * 0.05 * 100) / 100;
  }

  res.render("payroll", {
    allEmployees: null,
    employee: { ...employee, antiqueValue, highSchoolValue },
  });
}

module.exports = { payrollGet, payrollPost };
