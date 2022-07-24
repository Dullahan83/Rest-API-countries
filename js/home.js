/* https://restcountries.com/v3.1/all */
let index = 0;
let countryArray


(async () => {
    getData();
})();



function createCard(country){
    let codePlace = document.getElementById("countryList")
    let population = new Intl.NumberFormat("en-EN").format(country.population)
    let div = document.createElement("div")
    div.setAttribute("class", "country")
    div.innerHTML = `<a href="./country.html?name=${country.name.common}">
                            <figure class="card">
                                <img src=${country.flags.png} alt=${country.name.common}'s flag>
                                <figcaption class="description">
                                    <h3 class="countryName">${country.name.common}</h3>
                                    <p class="population"><span>Population:</span>${population}</p>
                                    <p class="region"><span>Region:</span>${country.region}</p>
                                    <p class="capital"><span>Capital:</span>${country.capital}</p>
                                </figcaption>
                            </figure>
                            </a>
                            `
    codePlace.appendChild(div)
}


async function getData(){
    document.getElementById("countryList").innerHTML = ""
    const response = await fetch("https://restcountries.com/v3.1/all")
    data = await response.json()
    countryArray = await sort(data)
    for(let country of countryArray){
        createCard(country)
    }
    /* for(let i = 0; i<10; i++){
        createCard(countryArray[i])
    } */
}


function sort(countryArray){
    let sort = countryArray.sort((a,b) =>{
        return a.name.common < b.name.common ? -1 : 0
    })
    return sort;
}

function filterByRegion(value){
    document.getElementById("countryList").innerHTML = ""
    const filter = countryArray.filter(country => {return country.region.includes(value)})
    for (let country of filter) {
        createCard(country)
    }
}

let select = document.querySelector("#select")
select.addEventListener("click",() =>{
   document.querySelector(".filterGroup").classList.toggle('none')
})

let selectOption = document.querySelectorAll(".filter input")
for(let filter of selectOption){
    filter.addEventListener("click", (e) => {
        if(e.target.checked){
            filterByRegion(e.target.name)
        }
        else{
            getData()
        }
    })
}
function search(input){
    document.getElementById("countryList").innerHTML = ""
    let filter = countryArray.filter(country => {
        return country.name.common.includes(input)
    })
    for(let country of filter){
        createCard(country)
    }
}

let input = document.querySelector(".searchBar input");
input.addEventListener("input", (e) => {
    search(e.target.value)
})