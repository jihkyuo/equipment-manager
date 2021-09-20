import express from "express";
import {
  see,
  createEquip,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  removeEquip,
} from "../controllers/equipController";

// Router 생성
const equipRouter = express.Router();

equipRouter.get("/:id(\\d+)", see);
equipRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
equipRouter.route("/upload").get(getUpload).post(postUpload);
equipRouter.get("/:id(\\d+)/remove", removeEquip);
equipRouter.get("/create", createEquip);

export default equipRouter;
