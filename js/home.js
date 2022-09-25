/* https://restcountries.com/v3.1/all */
const theme = localStorage.getItem("lightTheme");
let index = 0;
let countryArray;
(async () => {
   getData();
})();
console.log(theme);
function createCard(country) {
   let codePlace = document.getElementById("countryList");
   let population = new Intl.NumberFormat("en-EN").format(country.population);
   let div = document.createElement("div");
   let capital = country.capital ? country.capital : "";
   div.setAttribute("class", "country");
   div.innerHTML = `<a href="./country.html?name=${country.name.common}">
                            <figure class="card">
                                <img src=${country.flags.png} alt=${country.name.common}'s flag>
                                <figcaption class="description">
                                    <h3 class="countryName">${country.name.common}</h3>
                                    <p class="population"><span>Population:</span>${population}</p>
                                    <p class="region"><span>Region:</span>${country.region}</p>
                                    <p class="capital"><span>Capital:</span>${capital}</p>
                                </figcaption>
                            </figure>
                            </a>
                            `;
   codePlace.appendChild(div);
}

async function getData() {
   document.getElementById("countryList").innerHTML = "";
   const response = await fetch("https://restcountries.com/v3.1/all");
   data = await response.json();
   countryArray = await sort(data);
   for (let country of countryArray) {
      createCard(country);
   }
}

function sort(countryArray) {
   let sort = countryArray.sort((a, b) => {
      return a.name.common < b.name.common ? -1 : 0;
   });
   return sort;
}

function filterByRegion(value) {
   document.getElementById("countryList").innerHTML = "";
   const filter = countryArray.filter((country) => {
      return country.region.includes(value);
   });
   for (let country of filter) {
      createCard(country);
   }
}

let select = document.querySelector("#select");
select.addEventListener("click", () => {
   document.querySelector(".filterGroup").classList.toggle("none");
});

let selectOption = document.querySelectorAll(".filter input");
for (let filter of selectOption) {
   let choice = "";
   /* filter.nextElementSibling.style.color =
      theme && theme == "true" ? "hsl(200, 15%, 8%)" : "white"; */
   filter.addEventListener("click", (e) => {
      if (e.target.checked) {
         choice = e.target.id;
         filterByRegion(e.target.name);
         resetFilter(selectOption, choice);
         e.target.nextElementSibling.classList.toggle("active");
         /* filter.nextElementSibling.style.color = "red"; */
      } else {
         document.getElementById("countryList").innerHTML = "";
         e.target.nextElementSibling.classList.remove("active");
         /*  filter.nextElementSibling.style.color =
            theme && theme == "true" ? "hsl(200, 15%, 8%)" : "white"; */
         for (let country of countryArray) {
            createCard(country);
         }
      }
   });
}
function resetFilter(selectOption, chosenFilter) {
   for (let option of selectOption) {
      if (option.id != chosenFilter) {
         option.nextElementSibling.classList.remove("active");
         /* option.nextElementSibling.style.color =
            theme && theme == "true" ? "hsl(200, 15%, 8%)" : "white"; */
         option.checked = false;
      }
   }
}

function search(input) {
   document.getElementById("countryList").innerHTML = "";
   let filter = countryArray.filter((country) => {
      return country.name.common.toLowerCase().includes(input);
   });
   for (let country of filter) {
      createCard(country);
   }
}

let input = document.querySelector(".searchBar input");
input.addEventListener("input", (e) => {
   let string = e.target.value.toLowerCase();
   search(string);
});
