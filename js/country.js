let url = new URL(window.location.href)
let params = url.searchParams.get('name')



function getData(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(data => data.json())
    .then( country => {
        createCard(country)
    })
}
getData(params)

function createCard(country){
    let languages = getLanguages(country[0].languages)
    let currencies = getCurrencies(country[0].currencies)
    let population = new Intl.NumberFormat("en-EN").format(country[0].population)
    let codePlace = document.getElementById("details")
    let subRegion = country[0].subregion ? country[0].subregion : ""
    let capital = country[0].capital ? country[0].capital : ""
    codePlace.innerHTML = 
    `<img src="${country[0].flags.png}" alt="${country[0].name.common}'s flag">
    <div class="country">
        <h3>${country[0].name.common}</h3>
        <div class="countryInfos">
            <div class="first">
                <p><span class="bold">Native Name:</span>${country[0].name.official}</p>
                <p><span class="bold">Population:</span>${population}</p>
                <p><span class="bold">Region:</span>${country[0].region}</p>
                <p><span class="bold">Sub Region:</span>${subRegion}</p>
                <p><span class="bold">Capital:</span>${capital}</p>
            </div>
            <div class="second">
                <p><span class="bold">Top Level Domain:</span>${country[0].tld[0]}</p>
                <p><span class="bold">Currencies:</span>${currencies}</p>
                <p><span class="bold">Languages:</span>${languages}</p>
            </div>
        </div>
        <div class="neighbours">
            <p class="bold">Border Countries:</p>     
        </div>
    </div>`
    

    let neighbours = document.querySelector(".neighbours")
    let p = document.createElement("p")
    p.textContent = "None"

    country[0].borders ? addBorderCountries(country[0]) : neighbours.appendChild(p)
}

function addBorderCountries(country){
    for(let border of country.borders){
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then(data => data.json())
        .then(country => {
            let content = country[0].name.common
            let neighbours = document.querySelector(".neighbours")
            let link = document.createElement("a")
            link.setAttribute("href", `./country.html?name=${content}`)
            neighbours.appendChild(link)
            let button = document.createElement("button")
            button.setAttribute("class", "neighbour hover-pointer")
            button.textContent = content
            link.appendChild(button)
        })   
    }
}

function getLanguages(infoObject){
    let result =""
    if(infoObject){
        for(let [key, info] of Object.entries(infoObject)){
            result += info + ", "
        }
    }
    result = result.slice(0, -2)
    return result
}

function getCurrencies(infoObject){
    let currencies = []
    let result = ""
    if(infoObject){
        for(let [key, info] of Object.entries(infoObject)){
            currencies.push(info)
        }
        for(let currency of currencies){
            result += currency.name + ", "
        } 
    }
    else return result
    return result.slice(0, -2)
}


