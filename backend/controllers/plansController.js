import Plan from "../models/plansModel.js";

export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().populate("recipeReference");
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plans", error });
  }
};

export const createPlan = async (req, res) => {
  const { name, imageDescription, recipeReference } = req.body;

  try {
    const newPlan = new Plan({
      name,
      imageDescription,
      recipeReference,
    });
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: "Error creating plan", error });
  }
};

export const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { name, imageDescription, recipeReference } = req.body;

  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      { name, imageDescription, recipeReference },
      { new: true }
    );
    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: "Error updating plan", error });
  }
};

export const deletePlan = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlan = await Plan.findByIdAndDelete(id);
    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting plan", error });
  }
};
