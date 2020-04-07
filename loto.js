function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

let isEmpty = string => {
    if (string === "") {
        return true
    } else {
        return false
    }
}

let isEmail = string => {
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    if (regexEmail.test(string)) {
        return true
    } else {
        return false
    }
}

let isValidNumber = number => {
    if (number < 50 && number > 0) {
        return true
    } else {
        return false
    }
}

let viewGrids = (grid, winningGrid) => {
    let yourGrid = results.childNodes[1].childNodes[1].querySelectorAll("td")
    let resultsGrid = results.childNodes[1].childNodes[3].querySelectorAll("td")
    for (i in yourGrid) {
        yourGrid[i].innerHTML = grid[i]
        resultsGrid[i].innerHTML = winningGrid[i]
    }
}

let win = (grid, winningGrid) => {
    if (JSON.stringify(grid) == JSON.stringify(winningGrid)) {
        document.getElementById("loose").classList.add("hide")
        document.getElementById("win").classList.remove("hide")
    } else {
        document.getElementById("win").classList.add("hide")
        document.getElementById("loose").classList.remove("hide")
    }
}

let correctFirstName = false
let correctLastName = false
let correctEmail = false

const lotoForm = document.getElementById("loto-form")
const results = document.getElementById("results")

let winningGrid = []
while (winningGrid.length < 6) {
    winningGrid.push(getRandomIntInclusive(1, 49))
}
winningGrid.sort((a, b) => a - b)
console.log(`La grille gagant est ${winningGrid}. Chuuuuut, ne le dis à personne !`)

lotoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let grid = []

    if (isEmpty(lotoForm[0].value)) {
        lotoForm[0].classList.add("is-invalid")
        lotoForm[0].nextElementSibling.classList.remove("hide")
    } else {
        lotoForm[0].classList.remove("is-invalid")
        lotoForm[0].nextElementSibling.classList.add("hide")
        correctFirstName = true
    }

    if (isEmpty(lotoForm[1].value)) {
        lotoForm[1].classList.add("is-invalid")
        lotoForm[1].nextElementSibling.classList.remove("hide")
    } else {
        lotoForm[1].classList.remove("is-invalid")
        lotoForm[1].nextElementSibling.classList.add("hide")
        correctLastName = true
    }

    if (!isEmpty(lotoForm[2].value) && isEmail(lotoForm[2].value)) {
        lotoForm[2].classList.remove("is-invalid")
        lotoForm[2].nextElementSibling.classList.add("hide")
        correctEmail = true
    } else {
        lotoForm[2].classList.add("is-invalid")
        lotoForm[2].nextElementSibling.classList.remove("hide")
    }

    for (let i = 3; i < 9; i++) {
        if (isValidNumber(lotoForm[i].value)) {
            grid.push(parseInt(lotoForm[i].value))
            lotoForm[i].classList.remove("is-invalid")
        } else {
            lotoForm[i].classList.add("is-invalid")
            document.getElementById("grid-condition").classList.add("text-danger")
        }
    }
    
    if (correctFirstName && correctLastName && correctEmail && grid.length == 6) {
        document.getElementById("grid-condition").classList.remove("text-danger")
        grid.sort((a, b) => a - b)
        viewGrids(grid, winningGrid)
        win(grid, winningGrid)
    }
})