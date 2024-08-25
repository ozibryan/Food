import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ozibryan359:otono2024@cluster0.2dbgtxz.mongodb.net/food-del').then(() => console.log("DB Connected"));
}

