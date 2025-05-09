import {  Events } from "../models/eventsSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createEvents = async (req, res, next) => {
  console.log("Received request body:", req.body);

  const { event } = req.body;
  
  if (!event || typeof event !== "string" || event.trim() === "") {
    return res.status(400).json({ success: false, message: "Invalid event data!" });
  }
  

  try {
    console.log("Adding event:", event);
    
    await Events.create({ event });

    res.status(200).json({
      success: true,
      message: "Event is Created!",
    });

  } catch (err) {
    console.error("Error adding event:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


export const getAllEvents = async (req, res, next) => {
  try {
   const event = await Events.find();
   console.log("Fetched events:", event);
  res.status(200).json({
    success: true,
    event,
  });   
}  catch (err) {
  next(err);
}
};
 
