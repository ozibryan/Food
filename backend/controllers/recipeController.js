import recipeModel from '../models/recipeModel.js';
import fs from 'fs';

// add food item

const addRecipe = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const recipe = new recipeModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await recipe.save();
        res.json({ success: true, message: "Recipe Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, mesage: "Error" })
    }
}

// all food list

const listRecipe = async (req, res) => {
    try {
        const recipe = await recipeModel.find({});
        res.json({ success: true, data: foods })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// Remove Food item

const removeRecipe = async (req, res) => {
    try {
        const food = await recipeModel.findById(req.body.id);
        fs.unlink('uploads/${food.image', () => { })

        await recipeModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })

    }
}

export { addRecipe, listRecipe, removeRecipe } 