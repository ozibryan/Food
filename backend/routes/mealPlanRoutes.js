import express from "express";
import { getMealPlans, saveMealPlan } from "../controllers/mealPlanContoller.js";

const router = express.Router();

router.post("/", saveMealPlan);
router.get("/", getMealPlans);


export default router;
