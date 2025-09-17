import express from "express";
import {
  getContacts,
  addContact,
  deleteContact,
} from "../controller/contactController.js";
import { middleware } from "../middleware.js";

const router = express.Router();

router.get("/", middleware, getContacts);
router.post("/", middleware, addContact);
router.delete("/:id", middleware, deleteContact);

export default router;
