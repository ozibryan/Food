import express from "express";
import multer from "multer";
import path from "path";
import {
  addRecipe,
  getRecipeById,
  listRecipe,
  removeRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

const cpUpload = upload.fields([
  { name: "recipeImage", maxCount: 1 },
  { name: `ingredientImages`, maxCount: 5 },
]);

router.post("/add", cpUpload, addRecipe);
router.get("/list", listRecipe);
router.get("/list/:id", getRecipeById);
router.delete("/remove/:id", removeRecipe);

//get route for receipes

export default router;
