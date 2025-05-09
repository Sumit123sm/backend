import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Teacher = mongoose.model("Teacherreg", teacherSchema);
