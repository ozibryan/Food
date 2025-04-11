import express from 'express';
import { addItemToCart, getCart, getCartTwo, removeItemFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', addItemToCart);          
router.get('/:userId', getCartTwo);  
router.delete('/remove', removeItemFromCart);

export default router;