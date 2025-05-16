import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  name: {
    type: String,
    ref: 'Student',
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Absent with apology'],
    required: true
  }
  
});

export default mongoose.model('Attendance', attendanceSchema);
