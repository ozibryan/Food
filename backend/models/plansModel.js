import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageDescription: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, 
  },
  time: {
    type: String,
    default: function () {
      return new Date().toLocaleTimeString(); 
    },
  },
  recipeReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
});

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
