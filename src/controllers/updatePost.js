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
                author,
                text,
                updateDate
            } = req.body

            const itemPosition = articles.findIndex(item => item.id === id)

            const newArticle = {
                id: id,
                title: title || articles[itemPosition].title,
                subject: subject  || articles[itemPosition].subject,
                author: author || articles[itemPosition].author,
                text: text  || articles[itemPosition].text,
                createDate: articles[itemPosition].createDate,
                updateDate: updateDate || Date(),
            }

            articles[itemPosition] = newArticle

            if(articles[itemPosition] !== newArticle) {
                throw new Error(JSON.stringify({ error: "Update error", message: "Article not updated correctly! Try again." }))
            }

            manipulateFile.saveFile(articles)

            return res.render("home.ejs", { message: "Article updated" })
        } catch (err) {
            let errorMessage;
            try {
                errorMessage = JSON.parse(err.message);
            } catch (parseErr) {
                errorMessage = { error: "Unknown error", message: "An error occurred when trying to update the article.", status: "error" };
            }

            if(errorMessage.error === "Update error") {
                return res.render("home.ejs", { message: errorMessage.message })
            } else {
                return res.render("home.ejs", { message: errorMessage.message })
            }
        }
    }
}

export { UpdatePost }