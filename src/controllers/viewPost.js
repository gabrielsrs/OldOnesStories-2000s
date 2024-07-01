import { ManipulateFile } from "../utils/manipulateFile.js"


class ViewPost {
    handle (req, res) {
        const manipulateFile = new ManipulateFile()

        const articles = manipulateFile.openFile()

        const { message, status } = req.query

        return res.render("home.ejs", { articles: articles, message: message, status: status })
    }
}

export { ViewPost } 