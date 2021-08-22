import express from "express";
import {
  getUserEdit,
  getLogout,
  removeUser,
} from "../controllers/userController";

// Router 생성
const userRouter = express.Router();

userRouter.get("/edit", getUserEdit);
userRouter.get("/logout", getLogout);
userRouter.get("/remove", removeUser);

export default userRouter;
