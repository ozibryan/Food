import mongoose from "mongoose";

const MealPlanSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    required: true,
  },
  meals: {
    breakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }],
    lunch: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }],
    dinner: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }],
    snacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }],
  },
});

const MealPlan = mongoose.model("MealPlan", MealPlanSchema);

export default MealPlan;
