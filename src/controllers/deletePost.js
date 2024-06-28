import { ManipulateFile } from "../utils/manipulateFile.js"

class DeletePost {
    handle (req, res) {
        try {
            const manipulateFile = new ManipulateFile()

            const articles = manipulateFile.openFile()
            const { id } = req.body

            const itemPosition = articles.findIndex(item => item.id === id)

            articles.splice(itemPosition, 1)

            if(articles[itemPosition] && articles[itemPosition].id === id) {
                throw new Error({ error: "Delete error", message: "Article not deleted correctly! Try again." })
            }

            for(let index = itemPosition; index < articles.length; index++) {
                articles[index].id = index + 1
            }

            manipulateFile.saveFile(articles)

            return res.render("home.ejs", { message: "Article deleted" })
        } catch (err) {
            if(err.error === "Update error") {
                return res.render("home.ejs", { error: err.message })
            } else {
                return res.render("home.ejs", { error: "An error occurred when trying to delete the article." })
            }
        }
    }
}

export { DeletePost }