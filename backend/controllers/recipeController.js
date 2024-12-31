import recipeModel from "../models/recipeModel.js";
import fs from "fs/promises";

const addRecipe = async (req, res) => {
  try {
    console.log("Files:", req.files);
    // console.log("Body:", req.body);

    const recipeImage =
      req.files["recipeImage"] && req.files["recipeImage"][0]
        ? req.files["recipeImage"][0].filename
        : null;

    const ingredientImages = req.files["ingredientImages"] || [];

    let ingredients = [];
    let instructions = [];

    // Process ingredients from the request body
    if (req.body.ingredients) {
      ingredients = Array.isArray(req.body.ingredients)
        ? req.body.ingredients
        : JSON.parse(req.body.ingredients);
    }

    if (ingredients.length > 0) {
      ingredients = ingredients.map((ingredient, index) => {
        const imageFilename = ingredientImages[index]
          ? ingredientImages[index].filename
          : null;
    
        return {
          ...ingredient,
          image: imageFilename,
        };
      });
    }

    console.log(ingredients)

    // Process instructions from the request body
    if (req.body.instruction) {
      instructions = Array.isArray(req.body.instruction)
        ? req.body.instruction
        : JSON.parse(req.body.instruction);
    }

    const recipe = new recipeModel({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      cuisine: req.body.cuisine,
      preptime: req.body.preptime,
      image: recipeImage,
      ingredients: ingredients,
      instruction: instructions,  // Save instructions here
    });

    await recipe.save();

    res.json({ success: true, message: "Recipe Added Successfully" });
  } catch (error) {
    console.error("Error adding recipe:", error.message);
    res.status(500).json({
      success: false,
      message: "Error adding recipe",
      error: error.message,
    });
  }
};


// List all recipes
const listRecipe = async (req, res) => {
  try {
    const recipes = await recipeModel.find({});
    res.json({ success: true, data: recipes });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipeModel.findById(id);

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    res.json({ success: true, data: recipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Remove recipe
const removeRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const recipe = await recipeModel.findById(recipeId);

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    if (recipe.image) {
      try {
        await fs.unlink(`uploads/${recipe.image}`);
      } catch (err) {
        console.error("Error deleting image file:", err.message);
      }
    }

    await recipeModel.findByIdAndDelete(recipeId);

    res.json({ success: true, message: "Recipe Removed Successfully" });
  } catch (error) {
    console.error("Error removing recipe:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error removing recipe",
        error: error.message,
      });
  }
};

export { addRecipe, listRecipe, removeRecipe, getRecipeById };
