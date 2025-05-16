import Attendance from "../models/attendanceSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const markAttendance = async (req, res, next) => {
  const { attendanceRecords } = req.body;
  console.log(attendanceRecords);
  
  try {
    if (!attendanceRecords || !Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
      handleValidationError("Attendance data is missing or invalid!", 400);
    }
    const promiseRes = await Promise.all(attendanceRecords.map(async (record) => {
      const { name, status } = record;
      return await Attendance.create({ name, status });
    }));
    res.status(200).json({
      success: true,
      message: "Attendance marked successfully!",
      promiseRes
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAttendance = async (req, res, next) => {
  try {
    const attendanceRecords = await Attendance.find(); // Removed populate unless `student` is a ref
    res.status(200).json({
      success: true,
      attendance: attendanceRecords
    });
  } catch (err) {
    next(err);
  }
};
