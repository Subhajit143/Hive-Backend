import express from "express"
import { connectDb } from "./db/db.js"
import dotenv from "dotenv"
import { router } from "./router/auth.router.js";
import { AdminRouter } from "./router/admin.router.js";
import { productRouter } from "./router/product.router.js";
import cors from "cors"
import multer from "multer";
import { Product } from "./models/product.model.js";
import connectCloudinary from "./cloudinary/cloudinary.js"



const app = express();

//To tackel cors 
const corsOrigin={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,OPTIONS,PATCH",
    credentials:true,
};
app.use(cors(corsOrigin))

app.use(express.json());
dotenv.config({
    path: "./.env"
})
connectDb()
connectCloudinary()
app.get("/", (req, res) => {
    res.send("Server is Running!");
});


app.use("/api/auth", router);
app.use("/api/product",productRouter)
app.use("/api/admin", AdminRouter);


const PORT = process.env.PORT;  // Use Railway's port or fallback to 5000 for local dev
app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`);
});
