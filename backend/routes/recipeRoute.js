import express from 'express';
import multer from 'multer';
import path from 'path';
import { addRecipe1, listRecipe, removeRecipe } from '../controllers/recipeController.js';

const router = express.Router();


// Configure multer for file uploads

/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Add a unique timestamp to the file name
    }
});

const upload = multer({ storage: storage }); 
*/
console.log('Multer recipe router')

// Configure multer for file uploads 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Add a unique timestamp to the file name
    }
});

// Create Multer instance with dynamic fields handling
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Example limit: 5MB
}).fields([
    { name: 'recipeImage', maxCount: 1 }, // Recipe image
    { name: 'ingredientImages', maxCount: 12 }, // Ingredient images array
]);


router.post('/add', addRecipe1)

// Route to add a recipe
// router.get('/list', listRecipe);                               // Route to get all recipes    

// router.delete('/remove', removeRecipe);                        // Route to remove a recipe

export default recipeRouter;
