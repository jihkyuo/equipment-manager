import express from "express";
import {
  see,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteEquip,
} from "../controllers/equipController";
import { protectorMiddleware } from "../middlewares";

// Router 생성
const equipRouter = express.Router();

equipRouter.get("/:id([0-9a-f]{24})", see);
equipRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
equipRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deleteEquip);
equipRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(postUpload);

export default equipRouter;
