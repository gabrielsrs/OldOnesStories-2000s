import url from "url"
import { Article } from "../model/index.js"

class DeletePost {
    async handle (req, res) {
        try {
            const { id } = req.body

            await Article.findByIdAndDelete(id)
                .catch(err => {
                    throw new Error(JSON.stringify({ error: "Delete error", message: "Article not deleted correctly! Try again.", status: "error" }))
                })

            return res.redirect(url.format({ 
                pathname: "/", 
                query: { 
                    message: "Article deleted", status: "success" 
                } 
            }))
        } catch (err) {
            let errorMessage;
            
            try {
                errorMessage = JSON.parse(err.message);
            } catch (parseErr) {
                errorMessage = { error: "Unknown error", message: "An error occurred when trying to delete the article.", status: "error" };
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

export { DeletePost }