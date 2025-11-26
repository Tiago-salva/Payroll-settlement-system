const { getAllEmployees, getEmployee } = require("../models/employeesModel");

async function payrollGet(req, res) {
  const allEmployees = await getAllEmployees();
  res.render("payroll", { allEmployees: allEmployees, employee: null });
}

async function calculatePayroll(employee) {
  // Valor por antiguedad
  const porcentajeAntiguedad = employee.antiguedad * 0.05;
  const valorPorAntiguedad =
    Math.round(employee.salario_basico * porcentajeAntiguedad * 100) / 100;

  // Valor por secundario completo
  let valorPorSecundario = 0;
  if (employee.secundario) {
    valorPorSecundario =
      Math.round((employee.salario_basico + valorPorAntiguedad) * 0.05 * 100) /
      100;
  }

  // Salario total
  const salarioTotal =
    Math.round(
      (employee.salario_basico + valorPorAntiguedad + valorPorSecundario) * 100
    ) / 100;
  const contribuciones = await calcularContribuciones(salarioTotal);
  console.log(contribuciones);

  return {
    ...employee,
    valorPorAntiguedad,
    valorPorSecundario,
    salarioTotal,
    contribuciones,
  };
}

async function calcularContribuciones(salarioTotal) {
  // Jubilacion
  const aporteJubilacion = [
    Math.round(salarioTotal * 0.11 * 100) / 100,
    Math.round(salarioTotal * 0.03 * 100) / 100,
  ];

  // Obra social
  const obraSocial = Math.round(salarioTotal * 0.03 * 100) / 100;

  // Aporte sindical
  const aporteSindical = Math.round(salarioTotal * 0.02 * 100) / 100;

  const salarioFinal =
    Math.round(
      (salarioTotal -
        (aporteJubilacion[0] +
          aporteJubilacion[1] +
          obraSocial +
          aporteSindical)) *
        100
    ) / 100;

  return { aporteJubilacion, obraSocial, aporteSindical, salarioFinal };
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
