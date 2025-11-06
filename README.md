# 🚀 Sistema de Gestión de Proyectos y Tareas (Trello-like)

### 🧩 Proyecto desarrollado con **Node.js**, **Express**, **PostgreSQL** y **Sequelize ORM**

Este proyecto forma parte de mi portafolio backend, y tiene como objetivo demostrar mis habilidades en el desarrollo de **APIs RESTful profesionales** con **bases de datos relacionales** y manejo de **relaciones 1:N y N:M** utilizando **Sequelize** como capa de abstracción sobre PostgreSQL.

El sistema permite **registrar usuarios**, **crear proyectos** y **gestionar tareas**, con autenticación mediante **JWT (JSON Web Tokens)** y control de acceso por roles (**usuario / administrador**).

---

## 🧠 Descripción General

El sistema está diseñado al estilo **Trello simple**, permitiendo:

- 🔐 Registro y autenticación de usuarios.
- 📁 Creación y gestión de proyectos por usuario autenticado.
- ✅ Creación y asignación de tareas a proyectos (solo administradores).
- 🔗 Relaciones SQL implementadas con Sequelize:
  - **1:N:** Un usuario puede tener varios proyectos.
  - **1:N:** Un proyecto puede tener múltiples tareas.
  - **N:M:** Un usuario puede estar asignado a varias tareas y viceversa.

---

## 🧱 Tecnologías Utilizadas

| Categoría | Tecnología |
|------------|------------|
| **Backend** | Node.js + Express |
| **Base de Datos** | PostgreSQL |
| **ORM** | Sequelize |
| **Autenticación** | JWT (JSON Web Token) |
| **Encriptación de contraseñas** | bcrypt |
| **Variables de entorno** | dotenv |
| **Testing manual** | Postman |

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegurate de tener instalados en tu equipo:

- [Node.js (v18+)](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Postman](https://www.postman.com/) (para pruebas de la API)
- Git (para clonar el repositorio)

---

## 🧩 Instalación y Configuración

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/IvanBigrevich/sistema-de-gestion-de-proyectos.git
cd sistema-de-gestion-de-proyectos
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Crear base de datos en PostgreSQL

Abrí tu terminal o pgAdmin y ejecutá:

sql
CREATE DATABASE gestion_db;

### 4️⃣ Configurar variables de entorno
Creá un archivo llamado .env en la raíz del proyecto con el siguiente contenido:

.env
PORT=4000
DB_HOST=localhost
DB_PORT=5432 ```(o 5433 dependiendo de tu puerto habilitado)```
DB_USER=postgres
DB_PASSWORD=TuContraseña
DB_NAME=gestion_db ```(crear esta base de datos en tu espacio de PostgreSQL)```
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1h
⚠️ Importante: Asegurate de reemplazar TuContraseña por la contraseña real de tu usuario de PostgreSQL.

### 5️⃣ Iniciar el servidor
```bash
npm run dev
```

El servidor se iniciará en:

# 👉 http://localhost:4000

y mostrará en consola:

# csharp
✅ Conexión establecida con la base de datos.
🚀 Servidor en puerto 4000
🧠 Estructura del Proyecto

```bash
src/
│
├── config/          # Configuración de Sequelize y conexión a PostgreSQL
├── controllers/     # Lógica de negocio de cada módulo (auth, proyectos, tareas)
├── middlewares/     # Autenticación JWT y roles
├── models/          # Definición de entidades y relaciones (Sequelize)
├── routes/          # Endpoints principales de la API
├── utils/           # Funciones auxiliares (generación de tokens, etc.)
├── app.js           # Inicialización de rutas y middlewares
└── server.js        # Punto de entrada del servidor

```

# 🔐 Autenticación
El sistema usa JWT (JSON Web Token) para manejar las sesiones de usuario.

Una vez que un usuario inicia sesión o se registra, el sistema genera un token que debe incluirse en cada petición protegida dentro del encabezado:

# makefile
Authorization: Bearer <tu_token>


### 🧪 Pruebas con Postman

A continuación se describen los endpoints principales para probar la API:

🔹 1. Registro de Usuario
POST http://localhost:4000/api/auth/register

# Body (JSON):

json
{
  "username": "ivan",
  "email": "ivan@example.com",
  "password": "123456"
}

# Respuesta esperada:

json
{
  "user": {
    "id": "...",
    "username": "ivan",
    "email": "ivan@example.com"
  },
  "token": "<jwt_token>"
}

🔹 2. Login de Usuario
POST http://localhost:4000/api/auth/login

# Body (JSON):

json
{
  "email": "ivan@example.com",
  "password": "123456"
}
Respuesta esperada:

json
{
  "user": {
    "id": "...",
    "username": "ivan"
  },
  "token": "<jwt_token>"
}

🔹 3. Crear Proyecto
POST http://localhost:4000/api/projects

# Headers:

makefile
Authorization: Bearer <jwt_token>
Body (JSON):

json
{
  "name": "Sistema de Autenticación",
  "description": "Proyecto del portafolio con Node.js y PostgreSQL"
}

# Respuesta esperada:

json
{
  "id": "...",
  "name": "Sistema de Autenticación",
  "description": "Proyecto del portafolio con Node.js y PostgreSQL",
  "userId": "...",
  "createdAt": "...",
  "updatedAt": "..."
}

🔹 4. Listar Proyectos del Usuario
GET http://localhost:4000/api/projects

# Headers:

makefile
Authorization: Bearer <jwt_token>

🔹 5. Crear Tarea (solo administrador)
POST http://localhost:4000/api/tasks

# Headers:

makefile
Authorization: Bearer <jwt_token_admin>

# Body (JSON):

json
{
  "title": "Diseñar modelo de relaciones",
  "description": "Configurar relaciones 1:N y N:M con Sequelize",
  "projectId": "<id_proyecto_existente>"
}

# Respuesta esperada:

json
{
  "id": "...",
  "title": "Diseñar modelo de relaciones",
  "description": "Configurar relaciones 1:N y N:M con Sequelize",
  "status": "pending",
  "projectId": "<id_proyecto_existente>"
}

🔹 6. Listar Tareas
GET http://localhost:4000/api/tasks

# Headers:

makefile
Authorization: Bearer <jwt_token>

# 🧮 Relaciones en Base de Datos
Las entidades se relacionan de la siguiente forma:

Relación	Descripción
User → Project (1:N)	Un usuario puede crear múltiples proyectos.
Project → Task (1:N)	Un proyecto puede tener varias tareas.
User ↔ Task (N:M)	Un usuario puede estar asignado a varias tareas y viceversa.

# 🧰 Scripts Disponibles
Comando	Descripción
npm run dev	Inicia el servidor en modo desarrollo con nodemon
npm start	Inicia el servidor en modo producción
npm install	Instala todas las dependencias necesarias

💡 Mejores Prácticas Implementadas
✅ Uso de variables de entorno (.env)
✅ Arquitectura modular y escalable
✅ Sequelize ORM con relaciones complejas
✅ Encriptación de contraseñas con bcrypt
✅ Tokens JWT para autenticación y autorización
✅ Validación de roles (admin / user)
✅ Manejo de errores y respuestas coherentes en JSON

# 🧑‍💻 Autor
Iván Bigrevich
Desarrollador Backend con Node.js | PostgreSQL | Sequelize | REST APIs

Repositorio en GitHub: https://github.com/IvanBigrevich/sistema-de-gestion-de-proyectos-y-tareas.git