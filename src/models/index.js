import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";
import { Project } from "./project.model.js";
import { Task } from "./task.model.js";

// 1:N — Un usuario puede tener muchos proyectos
User.hasMany(Project, { foreignKey: "userId" });
Project.belongsTo(User, { foreignKey: "userId" });

// 1:N — Un proyecto puede tener muchas tareas
Project.hasMany(Task, { foreignKey: "projectId" });
Task.belongsTo(Project, { foreignKey: "projectId" });

// N:M — Un usuario puede estar asignado a muchas tareas y viceversa
User.belongsToMany(Task, { through: "UserTasks" });
Task.belongsToMany(User, { through: "UserTasks" });

export { sequelize, User, Project, Task };