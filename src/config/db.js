import mongoose from "mongoose"
import 'dotenv/config'
import { Article } from "../model/index.js"
import { articlesToInputList } from "../data/articles.js"

async function connectDb() {
    try {
        await mongoose.connect(process.env.DB_URI)

        const allArticles = await Article.find({})

        !allArticles.length && Article.create(articlesToInputList)

        console.log('db connected') 
    } catch (error) {
        console.log(`db not connected: ${error}`)
    }
}

export default connectDb