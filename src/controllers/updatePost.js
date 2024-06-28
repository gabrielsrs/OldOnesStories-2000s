import { ManipulateFile } from "../utils/manipulateFile.js"

class UpdatePost {
    handle (req, res) {
        try {
            const manipulateFile = new ManipulateFile()

            const articles = manipulateFile.openFile()
            const {
                id,
                title,
                subject,
                text,
                updateDate
            } = req.body

            const itemPosition = articles.findIndex(item => item.id === id)

            const newArticle = {
                id: id,
                title: title || articles[itemPosition].title,
                subject: subject  || articles[itemPosition].subject,
                text: text  || articles[itemPosition].text,
                createDate: articles[itemPosition].createDate,
                updateDate: updateDate || new Date(),
            }

            articles[itemPosition] = newArticle

            if(articles[itemPosition] !== newArticle) {
                throw new Error({ error: "Update error", message: "Article not updated correctly! Try again." })
            }

            manipulateFile.saveFile(articles)

            return res.render("home.ejs", { message: "Article updated" })
        } catch (err) {
            if(err.error === "Update error") {
                return res.render("home.ejs", { error: err.message })
            } else {
                return res.render("home.ejs", { error: "An error occurred when trying to update the article." })
            }
        }
    }
}

export { UpdatePost }