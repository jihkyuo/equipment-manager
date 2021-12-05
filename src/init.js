// async await 사용 => regeneratorRuntime 에러발생 => 최상단에 작성하여 전역으로 import
import regeneratorRuntime from "regenerator-runtime";

// .env 환경변수를 사용하기 위해 우리 앱의 가장 먼저 시작되는 부분에 작성하였다.
// require("dotenv").config();
import "dotenv/config";

// MongoDB와 서버 연결 : db.js 그대로 import
import "./db";

// 스키마 모델 가져오기
import "./models/Equips";
import "./models/User";

// app 가져오기
import app from "./server";

// app에 port 생성, ⬆⬆ 모든 내용을 listen한다.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`✅ Server Listening on port http://localhost:${PORT}`)
);
