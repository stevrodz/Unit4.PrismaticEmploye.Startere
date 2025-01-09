const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seedEmployees = async () => {
  const employees = [
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
    { name: "Diana" },
    { name: "Eve" },
    { name: "Frank" },
    { name: "Grace" },
    { name: "Hank" },
    { name: "Ivy" },
    { name: "Jack" },
  ];

  for (const employee of employees) {
    await prisma.employee.create({ data: employee });
  }

  console.log("Database seeded!");
  prisma.$disconnect();
};

seedEmployees();
