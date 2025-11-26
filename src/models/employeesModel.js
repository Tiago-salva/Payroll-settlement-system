const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addEmployee(data) {
  const newEmployee = await prisma.employee.create({
    data: {
      cuit: data.cuit,
      nombre_completo: data.nombre_completo,
      puesto: data.puesto,
      fecha_de_ingreso: new Date(data.fecha_de_ingreso),
      obra_social: data.obra_social,
      antiguedad: parseInt(data.antiguedad),
      modalidad: data.modalidad,
      tiempo_trabajado: parseInt(data.tiempo_trabajado),
      salario_basico: parseInt(data.salario_basico),
      dias_trabajados: parseInt(data.dias_trabajados),
      secundario: data.secundario,
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

async function editEmployee(id, data) {
  const updatedEmployee = await prisma.employee.update({
    where: { id: id },
    data: {
      cuit: data.cuit,
      full_name: data.nombre_completo,
      position: data.puesto,
      // entryDate: new Date(data.fecha_de_ingreso), // El valor tiene que ser el que ya tenia el empleado
      socialWork: data.obra_social,
      antique: parseInt(data.antiguedad),
      mode: data.modalidad,
      timeWorked: parseInt(data.tiempo_trabajado),
      basicSalary: parseInt(data.salario_basico),
      daysWorked: parseInt(data.dias_trabajados),
      highSchool: data.secundario,
    },
  });

  return updatedEmployee;
}

async function deleteEmployee(id) {
  await prisma.employee.delete({
    where: { id: id },
  });
}

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployee,
  editEmployee,
  deleteEmployee,
};
