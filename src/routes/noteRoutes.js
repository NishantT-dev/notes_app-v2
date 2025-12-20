import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import authMiddleware from "../middlewares/authMiddlewares.js";
import { createNoteValidation, updateNoteValidation } from "../validators/notevalidators.js";
const router = express.Router();
router.get("/", authMiddleware, getNotes);
router.post("/", authMiddleware, createNoteValidation, createNote);
router.get("/:id", authMiddleware, getNoteById);
router.put("/:id", authMiddleware, updateNoteValidation, updateNote);
router.delete("/:id", authMiddleware, deleteNote);
export default router;