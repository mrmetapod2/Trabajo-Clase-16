## Actividad 1 — Sistema de Tareas con Proyectos y Equipos

Gestor RESTful para proyectos y tareas con asignaciones a usuarios, prioridades, deadlines y seguimiento de progreso. Pensado para Node.js + Express + MongoDB (Mongoose).

---

## ✨ Características

-CRUDL completo para Proyectos y Tareas

-Asignación de tareas a usuarios (assignedTo)

-Seguimiento de estado y prioridad

-Deadlines y horas estimadas/reales

-Búsqueda de texto completo

-Filtros múltiples y ordenamiento por campos

-Populate de referencias (owner, teamMembers.user, project, assignedTo, dependencies)

-Paginación estándar (page, limit)

-Middlewares de validación y manejo robusto de errores

-Borrado físico o lógico (opcional)

---

## 🧱 Stack sugerido

-Runtime: Node.js 18+

-Framework: Express

-ODM: Mongoose

-Base de datos: MongoDB 6+

-Utilidades: Joi/Zod (validación), Helmet, CORS, morgan

---

## 🗂️ Esquemas de datos (Mongoose)

## Project
name: String! (trim)
description: String
owner: ObjectId<User>!
teamMembers: [{ user: ObjectId<User>, role: enum('manager','developer','designer','tester')='developer' }]
status: enum('planning','active','on-hold','completed','cancelled')='planning'
startDate: Date
endDate: Date
budget: Number
client: String
timestamps: true

## Task
title: String! (trim)
description: String
project: ObjectId<Project>!
assignedTo: ObjectId<User>
status: enum('todo','in-progress','review','completed')='todo'
priority: enum('low','medium','high','critical')='medium'
dueDate: Date
estimatedHours: Number
actualHours: Number
tags: [String]
dependencies: [ObjectId<Task>]
attachments: [{ filename, url, uploadedAt=Date.now }]
timestamps: true


## Sugerencia para borrado lógico (opcional):

Agregar isDeleted: { type: Boolean, default: false } o deletedAt: Date en ambos esquemas y filtrar por defecto isDeleted:false.

---

## 📦 Instalación
git clone <tu-repo>
cd <tu-repo>
npm install
cp .env.example .env


.env.example:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/todo_projects
 JWT_SECRET=...
 CORS_ORIGINS=http://localhost:5173

## Iniciar:

-npm run dev     
con nodemon

-npm start 
producción

---

## 🔌 Endpoints (v1)

Base URL: /api/v1

### Proyectos
Método	Ruta	Descripción  
GET	/projects	Listar (con paginación/filtros/orden)

-POST	/projects	Crear proyecto

-GET	/projects/:id	Obtener por ID

-PATCH	/projects/:id	Actualización parcial

-PUT	/projects/:id	Actualización total

-DELETE	/projects/:id	Eliminar (físico o lógico)

### Tareas
Método	Ruta	Descripción
-GET	/tasks	Listar (con paginación/filtros/orden/búsqueda)

-POST	/tasks	Crear tarea

-GET	/tasks/:id	Obtener por ID

-PATCH	/tasks/:id	Actualización parcial
