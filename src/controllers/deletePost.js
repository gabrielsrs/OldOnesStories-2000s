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
                throw new Error(JSON.stringify({ error: "Delete error", message: "Article not deleted correctly! Try again." }))
            }

            for(let index = itemPosition; index < articles.length; index++) {
                articles[index].id = index + 1
            }

            manipulateFile.saveFile(articles)

            return res.render("home.ejs", { message: "Article deleted" })
        } catch (err) {
            let errorMessage;
            try {
                errorMessage = JSON.parse(err.message);
            } catch (parseErr) {
                errorMessage = { error: "Unknown error", message: "An error occurred when trying to delete the article.", status: "error" };
            }

            if(errorMessage.error === "Update error") {
                return res.render("home.ejs", { message: errorMessage.message })
            } else {
                return res.render("home.ejs", { message: errorMessage.message })
            }
        }
    }
}

export { DeletePost }