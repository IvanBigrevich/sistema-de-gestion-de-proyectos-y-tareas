import { Task } from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, projectId } = req.body;
    const task = await Task.create({ title, description, projectId });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
};