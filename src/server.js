import express from "express";

// morgan middleware import
import morgan from "morgan";

// routers import
import globalRouter from "./routers/globalrouter";
import userRouter from "./routers/userRouter";
import equipRouter from "./routers/equipRouter";

// app 생성 -- express함수로 간단하게
const app = express();

// pug 템플릿 사용한다고 express에게 말하기
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// morgan (loger) middleware 생성
app.use(morgan("dev"));

// urlencoded설정 -> post 후 req.body를 서버에 이해시킨다.
app.use(express.urlencoded({ extended: true }));

// 루트 Router 사용하기
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/equip", equipRouter);

export default app;
