const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addEmployee(data) {
  console.log(data);
  const newEmployee = await prisma.employee.create({
    data: {
      cuit: data.cuit,
      nombre_completo: data.nombre_completo,
      puesto: data.puesto,
      fecha_de_ingreso: new Date(data.fecha_de_ingreso),
      obra_social: data.obra_social,
      antiguedad: parseInt(data.antiguedad),
      modalidad: data.modalidad,
      dias_trabajados: parseInt(data.dias_trabajados),
      salario_basico: parseInt(data.salario_basico),
      // El tiempo trabajado se calcula segun los dias trabajados
      tiempo_trabajado: (parseInt(data.dias_trabajados) * 100) / 30,
      secundario: data.secundario === "on" ? true : false,
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
      nombre_completo: data.nombre_completo,
      puesto: data.puesto,
      // fecha_de_ingreso: new Date(data.fecha_de_ingreso), // El valor tiene que ser el que ya tenia el empleado
      obra_social: data.obra_social,
      antiguedad: parseInt(data.antiguedad),
      modalidad: data.modalidad,
      dias_trabajados: parseInt(data.dias_trabajados),
      salario_basico: parseInt(data.salario_basico),
      tiempo_trabajado: (parseInt(data.dias_trabajados) * 100) / 30,
      secundario: data.secundario,
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
