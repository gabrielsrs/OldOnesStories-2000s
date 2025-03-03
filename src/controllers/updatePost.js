import url from "url"
import { Article } from "../model/index.js"

class UpdatePost {
    async handle (req, res) {
        try {
            const {
                id="",
                title="",
                subject="",
                author="",
                text="",
                updateDate
            } = req.body

            const newArticle = {
                title: title.trim(),
                subject: subject.trim(),
                author: author.trim(),
                text: text.trim(),
                updateDate: new Date(updateDate || new Date()),
            }

            await Article.findByIdAndUpdate(id, newArticle)
                .catch(error => {
                    throw new Error(JSON.stringify({ error: "Update error", message: "Article not updated correctly! Try again.", status: "error"}))
                })
            
            
            return res.redirect(url.format({ 
                pathname: "/", 
                query: { 
                    message: "Article updated", status: "success"
                } 
            }))
        } catch (err) {
            let errorMessage;

            try {
                errorMessage = JSON.parse(err.message);
            } catch (parseErr) {
                errorMessage = { error: "Unknown error", message: "An error occurred when trying to update the article.", status: "error" };
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

export { UpdatePost }