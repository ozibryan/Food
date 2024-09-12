import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        icon: { type: String },
        measure: { type: String, required: true },
        Substitue: { type: String, required: true }
    }],
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    cuisine: { type: String, required: true },
    preptime: { type: String }
})

const recipeModel = mongoose.model.recipe || mongoose.model("recipe", recipeSchema);

// console.log(mongoose.models.food.schema);

export default recipeModel; 