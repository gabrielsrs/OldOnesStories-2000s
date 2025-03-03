import { Article } from "../model/index.js"

class ViewPost {
    async handle (req, res) {
        const allArticles = await Article.find({})

        const { message, status } = req.query

        return res.render("home.ejs", { articles: allArticles, message: message, status: status })
    }
}

export { ViewPost } 