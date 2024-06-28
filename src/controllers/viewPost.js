import { ManipulateFile } from "../utils/manipulateFile.js"


class ViewPost {
    handle (req, res) {
        const manipulateFile = new ManipulateFile()

        const articles = manipulateFile.openFile()

        return res.render("home.ejs", { articles: articles })
    }
}

export { ViewPost } 