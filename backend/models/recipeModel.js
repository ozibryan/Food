import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String },
    cuisine: { type: String },
    preptime: { type: Number, min: 0 }, // Assuming time is in minutes; adjust as needed

    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        measure: { type: String, required: true },
        weight: { type: String }, // Optional, for ingredient weight
        image: { type: String }, // Optional, for ingredient image
        substitute: { type: String } // Single text field for substitute
    }],
    instruction: [{
        step: { type: String },
        instruction: { type: String, }

    }] // Array of strings for preparation steps
});

// Add indexes if necessary for performance
recipeSchema.index({ category: 1 });
recipeSchema.index({ cuisine: 1 });

// Define the model
const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe;