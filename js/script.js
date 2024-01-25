// Elementos e variáveis
let apiKey = "7257676f2a0c746bf1038a759e38ac61";
let apiCountryUrl = "https://countryflagsapi.com/png/";
let cityInput = document.querySelector("#city-input");
let searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");
const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");
// Loader
const toggleLoader = () => {
    loader.classList.toggle("hide");
};
// Funções
const getWeatherData = async (city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    toggleLoader();
    const response = await fetch(apiWeatherUrl);
    const data = await response.json();
    toggleLoader();
    return data;
}
const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    if (data.cod === "404") {
        showErrorMessage();
        return;
    }
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    weatherContainer.classList.remove("hide");
}
// Tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};
// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
})
cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
})