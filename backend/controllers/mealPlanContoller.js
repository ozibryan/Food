import MealPlan from "../models/MealPlan.js";

export const saveMealPlan = async (req, res) => {
  const { day, mealType, recipeId } = req.body;

  try {
    let mealPlan = await MealPlan.findOne({ day });

    if (!mealPlan) {
      mealPlan = new MealPlan({
        day,
        meals: {
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: [],
        },
      });
    }

    mealPlan.meals[mealType].push(recipeId);

    await mealPlan.save();

    res.status(200).json({ message: "Meal plan updated", mealPlan });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

export const getMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find()
      .populate("meals.breakfast")
      .populate("meals.lunch")
      .populate("meals.dinner")
      .populate("meals.snacks");

    res.status(200).json(mealPlans);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};
