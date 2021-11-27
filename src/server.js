import express from "express";

// morgan middleware import
import morgan from "morgan";

// express-session import
import session from "express-session";

// MongoStore import => 세션을 DB에 저장하여 로그인을 유지시키기 위한 작업
import MongoStore from "connect-mongo";

// routers import
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import equipRouter from "./routers/equipRouter";
import apiRouter from "./routers/apiRouter";

// local 미들웨어 import
import { localsMiddleware, protectorMiddleware } from "./middlewares";

// app 생성 -- express함수로 간단하게
const app = express();

// pug 템플릿 사용한다고 express에게 말하기
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// morgan (loger) middleware 생성
app.use(morgan("dev"));

// urlencoded설정 -> post 후 req.body를 서버에 이해시킨다.
app.use(express.urlencoded({ extended: true }));

// 세션 미들웨어 초기화: 이 미들웨어가 브라우저에 쿠키를 전송한다.
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

//백엔드가 기억하고 있는 user들을 보여주는 미들웨어
// app.use((req, res, next) => {
//   req.sessionStore.all((error, sessions) => {
//     next();
//   });
// });

// local 미들웨어 가져오기
app.use(localsMiddleware);

// express에게 폴더 노출시키기
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));

// 루트 Router 사용하기
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/equip", equipRouter);
app.use("/api", apiRouter);

export default app;
