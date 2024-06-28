import fs from "fs";

class ManipulateFile {
    saveFile(jso) {
        const jsonData = JSON.stringify(jso)
        try {
            fs.writeFileSync("./src/data/articles.json", jsonData)
        
          } catch (err) {
            throw new Error({ error: "File save", message: "Error when trying save the data. Try again!"})
          }
    }
    openFile() {
        try {
            const articles = fs.readFileSync("./src/data/articles.json", { encoding: 'utf8' })
            return JSON.parse(articles)

          } catch (err) {
            throw new Error({ error: "Open file", message: "Error when trying open file. Try again!"})
          }
    }
}

export { ManipulateFile }