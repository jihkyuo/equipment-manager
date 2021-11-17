import express from "express";

// 컨트롤러 import
import {
  getLogin,
  postLogin,
  getJoin,
  postJoin,
} from "../controllers/userController";
import { home, search } from "../controllers/equipController";
import { publicOnlyMiddleware } from "../middlewares";

// Router 생성
const rootRouter = express.Router();

// Router 사용
rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
