import express from "express";
import morgan from "morgan";

import { handleHome, handleLogin } from "./controllers";

const app = express();

const logger = morgan("dev");

app.use(logger);

app.get("/", handleHome);
app.get("/login", handleLogin);

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`✅ Server Listening on port http://localhost:${PORT}`)
);
