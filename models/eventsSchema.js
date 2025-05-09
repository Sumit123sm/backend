import mongoose from "mongoose";
import validator from "validator";

const eventsSchema = new mongoose.Schema({
  event: {
    type: String,
    trim: true,
    required: true
  },
});


export const Events = mongoose.model('Events', eventsSchema);



