import { Admin } from "../models/adminRegisterSchema.js";
import { Student } from "../models/studentRegisterSchema.js";
import { Teacher } from "../models/teacherRegisterSchema.js";

// Universal function
const handleSignup = async (Model, req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please fill all fields" });
  }

  try {
    const existingUser = await Model.findOne({ email });

    if (existingUser) {
      // If email and password match, treat as successful registration
      if (existingUser.password === password) {
        return res.status(200).json({ success: true, message: "User already registered with same credentials" });
      } else {
        return res.status(400).json({ success: false, message: "User already exists with a different password" });
      }
    }

    const newUser = new Model({ email, password });
    await newUser.save();
    res.status(200).json({ success: true, message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


// Routes
export const adminRegister = (req, res) => handleSignup(Admin, req, res);
export const studentRegister = (req, res) => handleSignup(Student, req, res);
export const teacherRegister = (req, res) => handleSignup(Teacher, req, res);
