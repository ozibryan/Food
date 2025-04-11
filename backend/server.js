import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import recipeRouter from "./routes/recipeRoute.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import plansRouter from "./routes/plansRoute.js"
import mealPlanRoutes from "./routes/mealPlanRoutes.js"
import cartRoutes from './routes/cart.js';
import shoppingRoutes from './routes/shopping.js';

// app config
const app = express()
const port = process.env.PORT || 4000;

//middleware
app.use(express.json())
app.use(cors())

//db connection  
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/api/recipe", recipeRouter)
app.use("/images", express.static('uploads'))
app.use('/api/user', userRouter)
app.use("/api/cart", cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/plans', plansRouter)
app.use("/api/meal-plan", mealPlanRoutes);
app.use("/api/shopping", shoppingRoutes);


app.use('/api/cart', cartRoutes);


app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})


