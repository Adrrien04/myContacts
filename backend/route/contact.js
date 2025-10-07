import express from "express";
import {
  getContacts,
  addContact,
  deleteContact,
  updateContact,
} from "../controller/contactController.js";
import { middleware } from "../middleware.js";

const router = express.Router();

router.get("/", middleware, getContacts);
router.post("/", middleware, addContact);
router.delete("/:id", middleware, deleteContact);
router.patch("/:id", middleware, updateContact);

export default router;
