import express from "express";
import {
  getUserEdit,
  getLogout,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";

// Router 생성
const userRouter = express.Router();

userRouter.get("/edit", getUserEdit);
userRouter.get("/logout", getLogout);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;
