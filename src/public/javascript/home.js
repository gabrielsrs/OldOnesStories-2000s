const about = document.querySelector("#about-icon")
const message = document.querySelector("#message") || ""
const articleInfo = document.querySelectorAll("#article-content>article")
const articleContent = document.querySelector("#article-content")
const recentArticles = document.querySelector("#recent-articles")
const oldArticles = document.querySelector("#old-articles")
const filterOptions = document.querySelector("#filter-options")
const filterName = document.querySelector("#filter-name")
const specificFilterOptions = document.querySelector("#specific-filter-options")
const filterSubmit = document.querySelector("#filter-submit>input")
const dateOptions = document.querySelector("#filter-date")
const subjectOptions = document.querySelector("#filter-subject")
const authorOptions = document.querySelector("#filter-author")


about.addEventListener("click", () => {
    const iconText = document.querySelector("#about-text")
    iconText.classList.toggle("hidden-about-text")
})

if (message) {
    setTimeout(() => {
        message.remove()
    }, 3000)
}

recentArticles.addEventListener("click", () => {
    const items = document.querySelectorAll("article")

    const sortedItems = Array.from(items).sort((afterElement, beforeElement) => {
        const dateBeforeElement = new Date(beforeElement.querySelector(".article-info").children[2].textContent)
        const dateAfterElement = new Date(afterElement.querySelector(".article-info").children[2].textContent)

        return  dateAfterElement - dateBeforeElement
    })

    articleContent.innerHTML = ""
    sortedItems.forEach(node => articleContent.appendChild(node))
    
})

oldArticles.addEventListener("click", () => {
    const items = document.querySelectorAll("article")

    const sortedItems = Array.from(items).sort((afterElement, beforeElement) => {
        const dateBeforeElement = new Date(beforeElement.querySelector(".article-info").children[2].textContent)
        const dateAfterElement = new Date(afterElement.querySelector(".article-info").children[2].textContent)

        return dateBeforeElement - dateAfterElement
    })

    articleContent.innerHTML = ""
    sortedItems.forEach(node => articleContent.appendChild(node))
})

dateOptions.addEventListener("click", (event) => {
    const listTarget = event.target.textContent.split("")
    listTarget[0] = listTarget[0].toUpperCase()

    setOption(listTarget.join(""))
    
    function createNewElement(className, labelName) {
        const tempDiv = document.createElement("div")
        const tempLabel = document.createElement("label")
        const tempSelect = document.createElement("select")

        tempDiv.setAttribute("id", className)
        tempDiv.classList.add("select-date")

        tempLabel.setAttribute("for", className)
        tempLabel.innerText = labelName

        specificFilterOptions.append(tempDiv)

        const divCreated = document.querySelector(`#${className}`)
        divCreated.append(tempLabel)
        divCreated.append(tempSelect)

        return divCreated
    }

    const divDay = createNewElement("select-date-day", "Day")
    const divMonth = createNewElement("select-date-month", "Month")
    const divYear = createNewElement("select-date-year", "Year")

    filterDay(divDay)
    filterMonth(divMonth)
    filterYear(divYear)

    const currentDate = new Date()

    divDay.children[1].value = currentDate.getDate()
    divMonth.children[1].value = currentDate.toLocaleString('default', { month: 'short' })

    divMonth.children[1].addEventListener("change", () => updateDay(divDay))
    divYear.children[1].addEventListener("change", () => updateDay(divDay))

    filterSubmit.name = "date"
})

subjectOptions.addEventListener("click", (event) => {
    const listTarget = event.target.textContent.split("")
    listTarget[0] = listTarget[0].toUpperCase()

    setOption(listTarget.join(""), "subject")

    filterSubmit.name = "subject"
})

authorOptions.addEventListener("click", (event) => {
    const listTarget = event.target.textContent.split("")
    listTarget[0] = listTarget[0].toUpperCase()

    setOption(listTarget.join(""), "author")

    filterSubmit.name = "author"
})

filterSubmit.addEventListener("click", (event) => {
    const itemsSelected = document.querySelectorAll(".item-selected")

    const filterSelected = event.target.name

    if (filterSelected === "subject") {
        articleContent.innerHTML = ""
        const selectedItems = Array.from(itemsSelected).map(item => item.textContent)
        selectedItems.forEach(item => filterSubject(item))

    } else if (filterSelected === "author") {
        articleContent.innerHTML = ""
        const selectedItems = Array.from(itemsSelected).map(item => item.textContent)
        selectedItems.forEach(item => filterAuthor(item))
    } else if (filterSelected === "date") {
        const selectDateDay = document.querySelector("#select-date-day>select").selectedOptions[0].value
        const selectDateMonth = document.querySelector("#select-date-month>select").selectedOptions[0].value
        const selectDateYear = document.querySelector("#select-date-year>select").selectedOptions[0].value

        filterDate(`${selectDateDay} ${selectDateMonth} ${selectDateYear}`)
    }
})

articleInfo.forEach(item => {
    item.querySelector(".article-subject").addEventListener("click", (event) => {
        filterSubject(event.target.textContent)
    })

    item.querySelector(".article-author").addEventListener("click", (event) => {
        filterAuthor(event.target.textContent)
    })
})

function filterDate(date) {
    articleContent.innerHTML = ""
    for (let item = 0, div; div = articleInfo[item]; item++) {
        const articleDate = new Date(div.querySelector(".article-info").children[2].textContent)
        const toFilterDate =  new Date(date)

        if (articleDate.toDateString() === toFilterDate.toDateString()) {
            articleContent.append(div)
        }
    }
}

function filterSubject(subject) {
    for (let item = 0, div; div = articleInfo[item]; item++) {
        if (div.querySelector(".article-subject").textContent === subject) {
            articleContent.append(div)
        }
    }
}

function filterAuthor(author) {
    for (let item = 0, div; div = articleInfo[item]; item++) {
        if (div.querySelector(".article-author").textContent === author) {
            articleContent.append(div)
        }
    }
}

function setOption(nameOfOption, position) {
    const currentFilter = document.querySelector("#filter-name")
    if (currentFilter.textContent === nameOfOption) {
        currentFilter.innerHTML = ""
        filterOptions.classList.add("hidden-filter")

        articleContent.innerHTML = ""
        Array.from(articleInfo).forEach(item => articleContent.append(item))
        return ""
    }

    filterOptions.classList.remove("hidden-filter")    

    filterName.innerHTML = `${nameOfOption}`

    specificFilterOptions.innerHTML = ""

    if(position === "subject" || position === "author") {
        const filteredElements = Array.from(articleInfo).map(item => item.querySelector(`.article-${position}`).textContent)

        const filteredElementsSet = new Set(filteredElements)

        filteredElementsSet.forEach(item => {
            if( Array.from(filteredElementsSet).slice(-1)[0] !== item ) {
                specificFilterOptions.innerHTML += `<span class="link">${item}</span>|`
            } else {
                specificFilterOptions.innerHTML += `<span class="link">${item}</span>`
            }
         
        })

        const itemsToSelect = document.querySelectorAll("#specific-filter-options>span")

        itemsToSelect.forEach(item => {
            item.addEventListener("click", (event) => {
                item.classList.toggle("item-selected")
            })
        })
    }
}

function updateDay(divDay) {
    const selectDateMonth = document.querySelector("#select-date-month>select").selectedOptions[0].value
    const selectDateYear = document.querySelector("#select-date-year>select").selectedOptions[0].value

    filterDay(divDay, `1 ${selectDateMonth} ${selectDateYear}`)
}

function filterDay(divDay, date=Date()) {
    const dateNow = new Date(date)
    function daysInMonth (month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    const daysInCurrentMonth = daysInMonth(dateNow.getMonth(), dateNow.getFullYear())

    for (let day = 1; day <= daysInCurrentMonth; day++) {
        const tempOption = document.createElement("option")
        tempOption.setAttribute("value", day)
        tempOption.innerHTML += day
        divDay.children[1].append(tempOption)
    }
}

function filterMonth(divMonth) {
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    for (let month = 0; month < shortMonths.length; month++) {
        const tempOption = document.createElement("option")
        tempOption.setAttribute("value", shortMonths[month])
        tempOption.innerHTML += shortMonths[month]
        divMonth.children[1].append(tempOption)
    }
}
function filterYear(divYear) {
    const dateNow = new Date()
    for (let year = dateNow.getFullYear(); year !== 1499; year--) {
        const tempOption = document.createElement("option")
        tempOption.setAttribute("value", year)
        tempOption.innerHTML += year
        divYear.children[1].append(tempOption)
    }
}