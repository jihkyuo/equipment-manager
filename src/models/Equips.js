import mongoose from "mongoose";

const equipSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  fileUrl: { type: String, required: true },
  manufacturer: { type: String, required: true, trim: true },
  place: { type: String, required: true, trim: true },
  code: { type: String, required: true, trim: true },
  createAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

//hook(or middleware) 생성
equipSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Equip = mongoose.model("Equips", equipSchema); //모델생성
export default Equip;
