import express from "express";

// 컨트롤러 import
import { getLogin, getJoin } from "../controllers/userController";
import { home, search } from "../controllers/equipController";

// Router 생성
const globalRouter = express.Router();

// Router 사용
globalRouter.get("/", home);
globalRouter.get("/join", getJoin);
globalRouter.get("/login", getLogin);
globalRouter.get("/search", search);

export default globalRouter;
