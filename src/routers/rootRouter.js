import express from "express";

// 컨트롤러 import
import { getLogin, getJoin, postJoin } from "../controllers/userController";
import { home, search } from "../controllers/equipController";

// Router 생성
const rootRouter = express.Router();

// Router 사용
rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", getLogin);
rootRouter.get("/search", search);

export default rootRouter;
