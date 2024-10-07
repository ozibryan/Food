import recipeModel from "../models/recipeModel.js";
import fs from "fs";

const addRecipe = async (req, res) => {
    try {
        console.log("Files:", req.files);
        console.log("Body:", req.body);

        const recipeImage =
            req.files["recipeImage"] && req.files["recipeImage"][0]
                ? req.files["recipeImage"][0].filename
                : null;

        const ingredientImages = req.files["ingredientImages"] || [];

        let ingredients = [];

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

        const recipe = new recipeModel({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            cuisine: req.body.cuisine,
            preptime: req.body.preptime,
            image: recipeImage,
            ingredients: ingredients,
        });

        await recipe.save();

        res.json({ success: true, message: "Recipe Added Successfully" });
    } catch (error) {
        console.error("Error adding recipe:", error.message);
        res
            .status(500)
            .json({
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

// Remove recipe
const removeRecipe = async (req, res) => {
    try {
        const recipe = await recipeModel.findById(req.body.id);
        if (recipe && recipe.image) {
            fs.unlink(`uploads/${recipe.image}`, () => { }); // Fixed path template literal
        }

        await recipeModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Recipe Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addRecipe, listRecipe, removeRecipe }