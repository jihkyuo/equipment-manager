import express from "express";

// 컨트롤러 import
import {
  getLogin,
  postLogin,
  getJoin,
  postJoin,
} from "../controllers/userController";
import { home, search } from "../controllers/equipController";

// Router 생성
const rootRouter = express.Router();

// Router 사용
rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
