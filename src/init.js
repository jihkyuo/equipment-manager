// MongoDB와 서버 연결 : db.js 그대로 import
import "./db";

// 스키마 모델 가져오기
import "./models/Equips";

// app 가져오기
import app from "./server";

// app에 port 생성, ⬆⬆ 모든 내용을 listen한다.
const PORT = 5000;

app.listen(PORT, () =>
  console.log(`✅ Server Listening on port http://localhost:${PORT}`)
);
