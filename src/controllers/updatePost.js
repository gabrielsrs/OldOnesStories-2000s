import url from "url"
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

            const itemPosition = articles.findIndex(item => item.id === parseInt(id))

            const newArticle = {
                id: parseInt(id),
                title: title.trim() || articles[itemPosition].title.trim(),
                subject: subject.trim()  || articles[itemPosition].subject.trim(),
                author: author.trim() || articles[itemPosition].author.trim(),
                text: text.trim()  || articles[itemPosition].text.trim(),
                createDate: articles[itemPosition].createDate,
                updateDate: updateDate || Date(),
            }

            articles[itemPosition] = newArticle

            if(articles[itemPosition] !== newArticle) {
                throw new Error(JSON.stringify({ error: "Update error", message: "Article not updated correctly! Try again.", status: "error"}))
            }

            manipulateFile.saveFile(articles)
            
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

            if(errorMessage.error === "Update error") {
                return res.redirect(url.format({ 
                    pathname: "/", 
                    query: { 
                        message: errorMessage.message, status: errorMessage.status
                    } 
                }))
            } else {
                return res.redirect(url.format({ 
                    pathname: "/", 
                    query: { 
                        message: errorMessage.message, status: errorMessage.status
                    } 
                }))
            }
        }
    }
}

export { UpdatePost }