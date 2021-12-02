import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlparser: true,
  userUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");

db.on("error", (error) => console.log("❌ DB Error", error));
db.once("open", handleOpen);
