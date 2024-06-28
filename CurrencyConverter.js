const BASE_URL = "https://v6.exchangerate-api.com/v6/883265a23b6d1df34fb16b70/latest/USD"




const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.getElementById("btn")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
let msg = document.getElementById("msg")


for(let select of dropdowns) {
    for(let currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode

        if(select.name == "from" && currCode == "USD") {
            newOption.selected = "selected"
        }
        else if(select.name == "to" && currCode == "BDT") {
            newOption.selected = "selected"
        }
        select.append(newOption)
    }
    select.addEventListener("change", function(evt) {
        updateFlag(evt.target)
    })
}

const updateFlag = (element) => {
    console.log(element)
    let currCode = element.value
    let countryCode = countryList[currCode]

    let img = element.previousElementSibling

    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`
    
}

const updateExchangeRate = async () => {
    let input = document.getElementById("inp")
    let amount = input.value
    if(amount == "" || amount<1) {
        amount = 1
        input.value = "1"
    }

    console.log(fromCurr.value, toCurr.value)
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL)
    let data = await response.json()
    let rate = data[toCurr.value.toLowerCase()]

    console.log(msg)
    let finalAmount = amount * rate
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}



btn.addEventListener("click", function(evt) {
    evt.preventDefault()     //ei preventDefault er maane hocche button e click korle by default je kaaj gula hoy oigula hobena. jemon button e click korlei page refresh nito etao omon e ekta by default kaaj
    updateExchangeRate()
})

window.addEventListener("load", () => {      // eta create korar mane hocche jokhn window ta load korbo tokhon thekei jate upadateExchangeRate function ta kaaj kore
    updateExchangeRate()
})

