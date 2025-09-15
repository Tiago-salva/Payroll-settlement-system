const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addUser(data, hashedPassword) {
  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
  });

  return newUser;
}

module.exports = {
  addUser,
};
