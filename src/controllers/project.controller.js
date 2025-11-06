import { Project } from "../models/project.model.js";

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.create({ name, description, userId: req.user.id });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  const projects = await Project.findAll({ where: { userId: req.user.id } });
  res.json(projects);
};