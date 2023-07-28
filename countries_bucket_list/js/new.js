console.log("Hi")

/*
1. In your JavaScript file, create a function which houses a fetch() request to the RESTCountries API and returns the response in JSON format

2. Create a SetUp() function which calls your first function and populates a global variable with the output. Have this function be called on load of your webpage

3. Create a function which uses this global variable to create a series of new HTML elements, populating each with information about each country (such as name and population), and adding them to the <ul> in your HTML. Call this function following your first function within the SetUp() function. Ensure that the original <p> element is removed ahead of populating your list

4. Add a simple <form> to your HTML with a single text-box input and a submit button. Create a function which is called when the form is submitted, printing the value of the <input> element to the console

5. Create a function which takes your global variable and filters it based off of the value recieved from your <form> above. Replace the contents of your <ul> with the filtered countries returned
*/

let data;
const listContainer = document.getElementById("countriesList");
const countryFilterForm = document.getElementById("filterCountriesForm");

const grabCountriesInfo = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const JSONresponse = await response.json();
    return JSONresponse;
}

async function setUp() {
    data = await grabCountriesInfo();
    listContainer.innerText = "";
    // setTimeout(() => {
        data.map(country => {
            listContainer.appendChild(createListItem(country))
        })
    // }, 4000)
}

function createListItem(country_information) {
    let newListItem = document.createElement("li");
    newListItem.innerText = `${country_information.name.common}, Population: ${country_information.population}`;
    return newListItem
}

setUp();



function handleFormSubmit(e) {
    e.preventDefault();
    console.log(e.target["CountryToFilter"].value)
    
    listContainer.innerText = "";
    // setTimeout(() => {
    const filteredData = data.filter(country => {
        return country.name.common.includes(e.target["CountryToFilter"].value)
    })

    filteredData.map(country => {
        listContainer.appendChild(createListItem(country))
    })
}

countryFilterForm.addEventListener("submit", handleFormSubmit)


// console.log(data)