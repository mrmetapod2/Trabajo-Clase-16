import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  teamMembers: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: { type: String, enum: ["manager", "developer", "designer", "tester"] }
  }],
  status: { type: String, enum: ["pending", "in progress", "completed"], default: "pending" },
  deadline: { type: Date },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
