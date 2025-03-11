import url from "url"
import { Article } from "../model/index.js"

class CreatePost {
    async handle (req, res) {
        try {
            const {
                title,
                subject,
                author,
                text,
                createDate,
                updateDate
            } = req.body

            const newArticle = {
                title: title.trim() || (() => { throw new Error(JSON.stringify({ error: "missing data", message: "Title data not filled!", status: "error" })) })(),
                text: text.trim()  || (() => { throw new Error(JSON.stringify({ error: "missing data", message: "Text data not filled!", status: "error" })) })(),
                subject: subject.trim()  || (() => { throw new Error(JSON.stringify({ error: "missing data", message: "Subject data not filled!", status: "error" })) })(),
                author: author.trim() || (() => { throw new Error(JSON.stringify({ error: "missing data", message: "Author data not filled!", status: "error" })) })(),
                createDate: new Date(createDate || Date()),
                updateDate: new Date(updateDate || Date()),
            }
 
            await Article.create(newArticle)
                .catch(err => {
                    throw new Error(JSON.stringify({ error: "Create error", message: "Article not created! Try again.", status: "error" }))
                })
            
            return res.redirect(url.format({ 
                pathname: "/", 
                query: { 
                    message: "Article created", status: "success"
                } 
            }))
        } catch (err) {
            let errorMessage;

            try {
                errorMessage = JSON.parse(err.message);
            } catch (parseErr) {
                errorMessage = { error: "Unknown error", message: "An error occurred when trying to create the article.", status: "error" };
            }

            return res.redirect(url.format({ 
                pathname: "/", 
                query: { 
                    message: errorMessage.message, status: errorMessage.status
                } 
            }))
        }
    }
}

export { CreatePost }