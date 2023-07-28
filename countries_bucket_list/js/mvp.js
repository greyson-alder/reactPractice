// our "state" variable
let APIdata;
const countriesList = document.getElementById("countriesList");
const filterCountriesForm = document.getElementById("filterCountriesForm");

filterCountriesForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    clearCountriesList();
    
    filterCountries(e.target[0].value.toLowerCase())
})

async function getAllCountries() {
    let countryData;

    await fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => countryData = data)

    return countryData;
}

function mapCountries(countriesArray) {
    for (country of countriesArray) {
        let countryElement = document.createElement("li");
        countryElement.classList.add("country");
        addCountryInformationToElement(countryElement);
        appendChild(countriesList, countryElement);
    }
}

function addCountryInformationToElement(li_countryElement) {
    let countryNameElement = document.createElement("h2");
    countryNameElement.innerText = country.name.common;
    appendChild(li_countryElement, countryNameElement)

    let countryPopulationElement = document.createElement("p");
    countryPopulationElement.innerText = `population: ${country.population}`;
    appendChild(li_countryElement, countryPopulationElement)
}

// had created as own function as envisioned also adding "classname" as a parameter
function appendChild(parentElement, childElement) {
    parentElement.appendChild(childElement);
}

function clearCountriesList() {
    countriesList.innerHTML = "";
}

async function filterCountries(filterParameter) {
    clearCountriesList();
    let filteredCountriesList = await APIdata.filter(
        country => country.name.common.toLowerCase().includes(filterParameter)
    );
    mapCountries(filteredCountriesList);
}

async function setUp() {
    clearCountriesList();
    APIdata = await getAllCountries();
    mapCountries(APIdata);
}

setUp();