import Mongoose from "mongoose";

const equipSchema = new Mongoose.Schema({
  name: String,
  description: String,
  createAt: Date,
  hashtags: [{ type: String }],
});
