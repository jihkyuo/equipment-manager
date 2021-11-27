import express from "express";

import { registerView } from "../controllers/equipController";

// Router 생성
const apiRouter = express.Router();

apiRouter.post("/equips/:id([0-9a-f]{24})/view", registerView);

export default apiRouter;
