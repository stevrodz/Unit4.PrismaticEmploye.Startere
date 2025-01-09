const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes

// Welcome Route
app.get("/", (req, res) => {
  res.send("Welcome to the Prismatic Employees API.");
});

// Get All Employees
app.get("/employees", async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.json(employees);
});

// Add a New Employee
app.post("/employees", async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Name is required and must be a string." });
  }

  const newEmployee = await prisma.employee.create({ data: { name } });
  res.status(201).json(newEmployee);
});

// Get Employee by ID
app.get("/employees/:id", async (req, res) => {
  const { id } = req.params;

  const employee = await prisma.employee.findUnique({ where: { id: parseInt(id, 10) } });

  if (!employee) {
    return res.status(404).json({ message: "Employee not found." });
  }

  res.json(employee);
});

// Update Employee by ID
app.put("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Name is required and must be a string." });
  }

  const employee = await prisma.employee.findUnique({ where: { id: parseInt(id, 10) } });

  if (!employee) {
    return res.status(404).json({ message: "Employee not found." });
  }

  const updatedEmployee = await prisma.employee.update({
    where: { id: parseInt(id, 10) },
    data: { name },
  });

  res.json(updatedEmployee);
});

// Delete Employee by ID
app.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;

  const employee = await prisma.employee.findUnique({ where: { id: parseInt(id, 10) } });

  if (!employee) {
    return res.status(404).json({ message: "Employee not found." });
  }

  await prisma.employee.delete({ where: { id: parseInt(id, 10) } });

  res.status(204).send();
});

// Error-handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`I am listening on http://localhost:${PORT}`);
});
