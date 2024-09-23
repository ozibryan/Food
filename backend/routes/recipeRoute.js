import express from 'express';
import multer from 'multer';
import path from 'path';
import { addRecipe, listRecipe, removeRecipe } from '../controllers/recipeController.js';

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

const upload = multer({ storage: storage }).fields([
    { name: 'recipeImage', maxCount: 1 },       // Single recipe image
    { name: 'ingredientImages', maxCount: 20 }  // Array of ingredient images (up to 20 files)
]);



router.post('/add', upload, (req, resp) => {
    console.log('Files:', req.files);
    console.log('Body:', req.body);
    addRecipe(req, rres);
});

// Route to add a recipe
router.get('/list', listRecipe);                               // Route to get all recipes   
router.delete('/remove', removeRecipe);                        // Route to remove a recipe

export default router;
