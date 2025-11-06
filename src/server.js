import app from "./app.js";
import { sequelize } from "./models/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida con la base de datos.");
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
  }
})();