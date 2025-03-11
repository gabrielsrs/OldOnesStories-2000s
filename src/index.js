import 'dotenv/config';
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDb from "./config/db.js";
import { router } from "./routes/index.js";

const app = express();

export const dbConnection = connectDb()

app.use(express.urlencoded({ extended: true }));

const __dirname = fileURLToPath(import.meta.url)

app.set("views", path.join(__dirname, "../views"))
app.set("view engine", "ejs")

app.use(express.static("src/public"))
app.use(router)

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running!!")
})