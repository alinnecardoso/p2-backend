// src/controllers/user.controller.js
const User = require("../models/user.model");

const getAllUsers = (req, res) => {
  const users = User.findAll();
  res.json(users);
};

const getUserById = (req, res) => {
  const user = User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(user);
};

const createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Nome e email são obrigatórios" });
  }
  const newUser = User.create({ name, email });
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const { name, email } = req.body;
  const updatedUser = User.update(req.params.id, { name, email });
  if (!updatedUser) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(updatedUser);
};

const deleteUser = (req, res) => {
  const deleted = User.delete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json({ message: "Usuário deletado com sucesso" });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
