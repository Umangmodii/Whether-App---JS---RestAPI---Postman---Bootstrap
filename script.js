const form = document.querySelector('#weatherForm');
const search = document.querySelector('#search');
const weather = document.querySelector('#weather');
const searchBtn = document.querySelector('#searchBtn');
const breadcrumb = document.querySelector('#breadcrumb');
const api_key = "bb3cc484d487fbb7d52ead01c6e49fdd"; // Replace with your actual API key

const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Check the console for API response
            // Update the weather information on the page
            const temperature = (data.main.temp / 11).toFixed(2);
            const currentTime = new Date();
            const sunriseTime = new Date(data.sys.sunrise * 1000);
            const sunsetTime = new Date(data.sys.sunset * 1000);
            const weatherCondition = data.weather[0].main;

            let iconClass = '';
            if (currentTime > sunriseTime && currentTime < sunsetTime) {
                iconClass = 'fas fa-sun fa-fw'; // Day icon
            } else {
                iconClass = 'fas fa-moon fa-fw'; // Night icon
            }

            const weatherInfo = `
                <h6 class="flex-grow-1">${data.name}</h6>
                <h6>${currentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</h6>
                <div class="d-flex align-items-center">
                    <i class="${iconClass}" style="color: ${iconClass === 'fas fa-sun fa-fw' ? '#fdd835' : '#37474f'};"></i> <!-- Sun or Moon icon -->
                    <h6 class="display-4 mb-0 font-weight-bold">${temperature}°C</h6>
                </div>
                <span class="small">${weatherCondition}</span>
                <hr>
                <p>Temperature: ${temperature}°C</p>
                <p>Precipitation: ${data.clouds.all}%</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} km/h</p>
                <hr>
                <p>Sunrise: ${sunriseTime.toLocaleTimeString()}</p>
                <p>Sunset: ${sunsetTime.toLocaleTimeString()}</p>
                <!-- Add more weather information as needed -->
            `;

            weather.innerHTML = weatherInfo;

            // Update breadcrumb with the city name
            breadcrumb.innerHTML = `
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">${data.name}</li>
            `;
        } else {
            throw new Error('City not found');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Display an error message to the user
        weather.innerHTML = `<div class="alert alert-danger" role="alert">City not found. Please enter a valid city name.</div>`;
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    getWeather(search.value);
});

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    getWeather(search.value);
});