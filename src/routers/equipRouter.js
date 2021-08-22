import express from "express";
import {
  see,
  createEquip,
  getEdit,
  removeEquip,
} from "../controllers/equipController";

// Router 생성
const equipRouter = express.Router();

equipRouter.get("/:id", see);
equipRouter.get("/create", createEquip);
equipRouter.get("/edit", getEdit);
equipRouter.get("/remove", removeEquip);

export default equipRouter;
