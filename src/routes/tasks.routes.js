import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getTasks,     // Obtener todas las tareas
  getTask,      // Obtener una tarea por ID
  createTask,   // Crear una nueva tarea
  updateTask,   // Actualizar una tarea existente
  deleteTask    // Eliminar una tarea
} from "../controllers/tasks.controller.js"; //  Eliminar duplicado y agregar getTask

const router = Router();

// Rutas protegidas que requieren autenticación
router.get("/tasks", authRequired, getTasks);         // Obtener todas las tareas
router.get("/tasks/:id", authRequired, getTask);      // Obtener una tarea específica
router.post("/tasks", authRequired, createTask);      // Crear tarea
router.put("/tasks/:id", authRequired, updateTask);   // Actualizar tarea
router.delete("/tasks/:id", authRequired, deleteTask); // Eliminar tarea

export default router;
