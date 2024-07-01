import { ManipulateFile } from "../utils/manipulateFile.js"

class CreatePost {
    handle (req, res) {
        try {
            const manipulateFile = new ManipulateFile()

            const articles = manipulateFile.openFile()
            const {
                title,
                subject,
                author,
                text,
                createDate,
                updateDate
            } = req.body

            const newArticle = {
                id: articles.length + 1,
                title: title.trim() || (() => { throw new Error(JSON.stringify({ error: "missing data", message: "Title data not filled!", status: "error" })) })(),
                text: text.trim()  || (() => { throw new Error(JSON.stringify({ error: "missing data", message: "Text data not filled!", status: "error" })) })(),
                subject: subject.trim()  || (() => { throw new Error(JSON.stringify({ error: "missing data", message: "Subject data not filled!", status: "error" })) })(),
                author: author.trim() || (() => { throw new Error(JSON.stringify({ error: "missing data", message: "Author data not filled!", status: "error" })) })(),
                createDate: createDate || Date(),
                updateDate: updateDate || Date(),
            }

            articles.push(newArticle)

            if(articles.slice(-1)[0] !== newArticle) {
                throw new Error(JSON.stringify({ error: "Create error", message: "Article not found! Try again.", status: "error" }))
            }

            manipulateFile.saveFile(articles)

            return res.render("home.ejs", { articles: articles, message: "Article created", status: "success" })
        } catch (err) {
            let errorMessage;

            const manipulateFile = new ManipulateFile()

            const articles = manipulateFile.openFile()

            try {
                errorMessage = JSON.parse(err.message);
            } catch (parseErr) {
                errorMessage = { articles: articles, error: "Unknown error", message: "An error occurred when trying to create the article.", status: "error" };
            }

            if(errorMessage.error === "missing data") {
                return res.render("home.ejs", { articles: articles, message: errorMessage.message, status: errorMessage.status })
            } else if (errorMessage.error === "Create error") {
                return res.render("home.ejs", { articles: articles, message: errorMessage.message, status: errorMessage.status })
            } else {
                console.log(errorMessage)
                return res.render("home.ejs", { articles: articles, message: errorMessage.message, status: errorMessage.status })
            }
        }
    }
}

export { CreatePost }