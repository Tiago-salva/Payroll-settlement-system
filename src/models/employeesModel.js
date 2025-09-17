const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addEmployee(data) {
  const newEmployee = await prisma.employee.create({
    data: {
      cuit: data.cuit,
      full_name: data.full_name,
      position: data.position,
      entryDate: new Date(data.entry_date),
      socialWork: data.social_work,
      antique: parseInt(data.antique),
      mode: data.mode,
      timeWorked: parseInt(data.time_worked),
      basicSalary: parseInt(data.basic_salary),
      daysWorked: parseInt(data.days_worked),
      highShcool: data.high_school,
      userId: 1,
    },
  });

  return newEmployee;
}

async function getAllEmployees() {
  return await prisma.employee.findMany();
}

async function getEmployee(id) {
  return await prisma.employee.findUnique({
    where: { id },
  });
}

module.exports = { addEmployee, getAllEmployees, getEmployee };
