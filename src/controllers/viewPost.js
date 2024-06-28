import articles from "../data/articles.json" assert { type: 'json' };

class ViewPost {
    handle (req, res) {
        return res.render("home.ejs", { articles: articles })
    }
}

export { ViewPost } 