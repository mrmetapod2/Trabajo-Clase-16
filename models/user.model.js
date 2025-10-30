import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ["manager", "developer", "designer", "tester"], default: "developer" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
