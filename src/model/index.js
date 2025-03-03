import mongoose from "mongoose"
import { articleSchema } from "./article.js"

export const Article = mongoose.model("Article", articleSchema)
