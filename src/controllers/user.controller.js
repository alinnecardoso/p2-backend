// src/controllers/user.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(user);
};

const createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Nome e email são obrigatórios" });
  }
  const newUser = await prisma.user.create({
    data: { name, email },
  });
  res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { name, email },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: "Usuário não encontrado" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(404).json({ message: "Usuário não encontrado" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
