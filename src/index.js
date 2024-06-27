import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { router } from "./routes/index.js"

const app = express();

const __dirname = fileURLToPath(import.meta.url)

app.set("views", path.join(__dirname, "../views"))
app.set("view engine", "ejs")

app.use(express.static("src/public"))
app.use(router)

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running!!")
})