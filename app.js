import express from 'express';
import { config } from 'dotenv';
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

import { dbConnection } from './database/dbConnection.js';
import studentRouter from './routes/studentRouter.js';
import teacherRouter from './routes/teacherRouter.js';
import assignmentRouter from './routes/assignmentRouter.js';
import announcementRouter from './routes/announcementRouter.js';
import classRouter from './routes/classRouter.js';
import libraryRouter from './routes/libraryRouter.js';
import examRouter from './routes/examRouter.js';
import attendanceRouter from './routes/attendanceRouter.js';
import eventsRouter from './routes/eventsRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';


const app = express();
config({ path: './config/config.env' });

// ✅ Fixed: CORS configuration for frontend requests
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Important if using authentication
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Fixed: Moved error handling middleware after routes
// Routes
app.use("/api", authRoutes);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/announcements", announcementRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/exams", examRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/events", eventsRouter);

// ✅ Fixed: Error handling middleware placed after routes
app.use(errorHandler);

dbConnection();

export default app;
