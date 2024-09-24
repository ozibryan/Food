import recipeModel from '../models/recipeModel.js';
import fs from 'fs';

// Add recipe

console.log('recipe router');

const addRecipe = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    let image_filename = req.file ? req.file.filename : '';

    const recipeImage = req.files['recipeImage'] ? req.files['recipeImage'][0] : null;
    const ingredientImages = req.files['ingredientImages'] || [];

    // Handle recipeImage (main image) and ingredientImages (array of ingredient images)
    console.log('Controller Recipe Image:', recipeImage);
    console.log('Controller Ingredient Images:', ingredientImages);

    const recipe = new recipeModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
        cuisine: req.body.cuisine,
        preptime: req.body.preptime,
        ingredients: JSON.parse(req.body.ingredients) // Assuming ingredients are sent as a JSON string
    });

    try {
        await recipe.save();
        res.json({ success: true, message: "Recipe Added" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Error" });
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

export { addRecipe, listRecipe, removeRecipe };
