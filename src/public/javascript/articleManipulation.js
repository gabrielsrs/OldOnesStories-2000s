for (let index = 0, div; div = articleInfo[index]; index++) {
    const articleText = div.querySelector(".article-text>span")
    articleText.addEventListener("click", (event) => {
        event.target.setAttribute("hidden", "hidden")

        const article = event.target.closest("article")

        article.querySelector(".close-article").removeAttribute("hidden", "hidden")
        article.querySelector("h1").removeAttribute("hidden", "hidden")
        article.querySelector(".article-text > p").removeAttribute("hidden", "hidden")
        article.querySelector(".edit").removeAttribute("hidden", "hidden")

    })

    const closeArticle = div.querySelector(".close-article")
    closeArticle.addEventListener("click", (event) => {
        const article = event.target.closest("article")

        article.querySelector(".article-text>span").removeAttribute("hidden", "hidden")

        article.querySelector(".close-article").setAttribute("hidden", "hidden")
        article.querySelector("h1").setAttribute("hidden", "hidden")
        article.querySelector("h1").removeAttribute("contenteditable", "true")
        article.querySelector(".article-text > p").setAttribute("hidden", "hidden")
        article.querySelector(".article-text > p").removeAttribute("contenteditable", "true")
        article.querySelector(".edit").setAttribute("hidden", "hidden")
        article.querySelector(".edit-open").setAttribute("hidden", "hidden")
        article.querySelector(".article-info").removeAttribute("hidden", "hidden")
        article.querySelector(".edit-info").setAttribute("hidden", "hidden")
    })

    const edit = div.querySelector(".edit>span")
    edit.addEventListener("click", (event) => {
        event.target.parentElement.hasAttribute("hidden") || event.target.parentElement.setAttribute("hidden", "hidden")

        const article = event.target.closest("article")
        
        article.querySelector(".edit-open").removeAttribute("hidden", "hidden")

        article.querySelector("h1").setAttribute("contenteditable", "true")
        article.querySelector(".article-text>p").setAttribute("contenteditable", "true")

        article.querySelector(".article-info").setAttribute("hidden", "hidden")
        article.querySelector(".edit-info").removeAttribute("hidden", "hidden")
        
    })

    const changeArticleForm = div.querySelector(".change-article")
    changeArticleForm.addEventListener("submit", (event) => {
        const titleEdited = event.target.querySelector(".title-edited")
        const textEdited = event.target.querySelector(".text-edited")
        const submitEdited = event.target.querySelector(".subject-edited")
        const authorEdited = event.target.querySelector(".author-edited")

        titleEdited.value = titleEdited.nextElementSibling.textContent
        textEdited.value = textEdited.nextElementSibling.textContent
        submitEdited.value = submitEdited.nextElementSibling.textContent 
        authorEdited.value = authorEdited.nextElementSibling.textContent

    })
}

const newArticle = document.querySelector("#new-article .link")
const formToCreateArticle = document.querySelector("#create-new-article")

newArticle.addEventListener("click", () => {
    formToCreateArticle.removeAttribute("hidden", "hidden")
})

const closeForm = document.querySelector("#close-form")
closeForm.addEventListener("click", () =>{
    formToCreateArticle.setAttribute("hidden", "hidden")
})