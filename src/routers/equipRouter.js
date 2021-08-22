import express from "express";
import {
  see,
  createEquip,
  getEdit,
  removeEquip,
} from "../controllers/equipController";

// Router 생성
const equipRouter = express.Router();

equipRouter.get("/:id(\\d+)", see);
equipRouter.get("/:id(\\d+)/edit", getEdit);
equipRouter.get("/:id(\\d+)/remove", removeEquip);
equipRouter.get("/create", createEquip);

export default equipRouter;
