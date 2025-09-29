import express from "express";
import { Controllers } from "../controllers/contactsControllers.js";

export const contactsRouter = express.Router();

contactsRouter.get("/", Controllers.getAllContacts);

contactsRouter.get("/:id", Controllers.getOneContact);

contactsRouter.delete("/:id", Controllers.deleteContact);

contactsRouter.post("/", Controllers.createContact);

contactsRouter.put("/:id", Controllers.updateContact);

console.log(Controllers.getAllContacts);
