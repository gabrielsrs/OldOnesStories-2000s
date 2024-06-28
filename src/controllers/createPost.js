import { ManipulateFile } from "../utils/manipulateFile.js"

class CreatePost {
    handle (req, res) {
        try {
            const manipulateFile = new ManipulateFile()

            const articles = manipulateFile.openFile()
            const {
                title,
                subject,
                text,
                createDate,
                updateDate
            } = req.body

            const newArticle = {
                id: articles.length + 1,
                title: title || (() => { throw new Error({ error: "missing data", message: "Title data not filled!" }) })(),
                subject: subject  || (() => { throw new Error({ error: "missing data", message: "Subject data not filled!" }) })(),
                text: text  || (() => { throw new Error({ error: "missing data", message: "Text data not filled!" }) })(),
                createDate: createDate || new Date(),
                updateDate: updateDate || new Date(),
            }

            articles.push(newArticle)

            if(articles.slice(-1)[0] !== newArticle) {
                throw new Error({ error: "Create error", message: "Article not found! Try again." })
            }

            manipulateFile.saveFile(articles)

            return res.render("home.ejs", { message: "Article created" })
        } catch (err) {
            if(err.error === "missing data") {
                return res.render("home.ejs", { error: err.message })
            } else if (err.error === "Create error") {
                return res.render("home.ejs", { error: err.message })
            } else {
                console.log(err)
                return res.render("home.ejs", { error: "An error occurred when trying to create the article." })
            }
        }
    }
}

export { CreatePost }