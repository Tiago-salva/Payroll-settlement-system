const { getAllEmployees, getEmployee } = require("../models/employeesModel");

async function payrollGet(req, res) {
  const allEmployees = await getAllEmployees();
  res.render("payroll", { allEmployees: allEmployees, employee: null });
}

async function calculatePayroll(employee) {
  // Antique value
  const percent = employee.antique * 0.05;
  const antiqueValue = Math.round(employee.basicSalary * percent * 100) / 100;

  // High school value
  let highSchoolValue = 0;
  if (employee.highSchool) {
    highSchoolValue =
      Math.round((employee.basicSalary + antiqueValue) * 0.05 * 100) / 100;
  }

  // Total salary
  const totalSalary =
    Math.round((employee.basicSalary + antiqueValue + highSchoolValue) * 100) /
    100;
  const contributions = await calculateContributions(totalSalary);
  console.log(contributions);

  return {
    ...employee,
    antiqueValue,
    highSchoolValue,
    totalSalary,
    contributions,
  };
}

async function calculateContributions(totalSalary) {
  const retirementContribution = [
    Math.round(totalSalary * 0.11 * 100) / 100,
    Math.round(totalSalary * 0.03 * 100) / 100,
  ];
  const socialWork = Math.round(totalSalary * 0.03 * 100) / 100;
  const unionDues = Math.round(totalSalary * 0.02 * 100) / 100;

  const finalSalary =
    Math.round(
      (totalSalary -
        (retirementContribution[0] +
          retirementContribution[1] +
          socialWork +
          unionDues)) *
        100
    ) / 100;

  return { retirementContribution, socialWork, unionDues, finalSalary };
}

async function payrollPost(req, res) {
  const { employeeId } = req.body;
  const employee = await getEmployee(parseInt(employeeId));

  const employeeValues = await calculatePayroll(employee);
  console.log(employeeValues);

  res.render("payroll", {
    allEmployees: null,
    employee: {
      ...employeeValues,
    },
  });
}

module.exports = { payrollGet, payrollPost };
