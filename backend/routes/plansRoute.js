// routes/planRoutes.js
import express from "express";
import {
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "../controllers/plansController.js";

const router = express.Router();

router.get("/", getAllPlans);
router.post("/", createPlan);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

export default router;
