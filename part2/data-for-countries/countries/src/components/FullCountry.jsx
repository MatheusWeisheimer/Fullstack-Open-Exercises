import { useState, useEffect } from "react"
import weatherService from "../services/weatherService"

const FullCountry = ({country}) => {
    const [weatherData, setWeatherData] = useState(null)
    const languagesJsx = Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)

    useEffect(() => {
        weatherService.getWeather(country.capitalInfo.latlng)
            .then(res => setWeatherData(res))
    }, [])    

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>Languages:</h3>
            <ul>{languagesJsx}</ul>
            <img src={country.flags.png}/>
            {
                weatherData != null &&
                <>
                    <h2>Weather in {country.capital[0]}</h2>
                    <p>temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celcius</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
                    <p>wind {weatherData.wind.speed} m/s</p>
                </>
            }
        </div>
    )
}

export default FullCountry