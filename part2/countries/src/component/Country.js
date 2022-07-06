import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    const [weather, setWeather] = useState({});
    useEffect(() => {
        axios.get(api_url).then((res) => {
            setWeather(res.data)
        })
    }, [])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital[0]}</p>
            <p>area: {country.area}</p>
            <h3>languages</h3>
            <ul>{Object.keys(country.languages).map((lang) => <li key={lang}>{country.languages[lang]}</li>)}</ul>
            <img src={country.flags.png} alt={country.flag} />
            <h2>Weather in {country.capital[0]}</h2>
            {
                weather.main ?
                <>
                    <p>temperature {weather?.main?.temp} {country.capital[0]}</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`} />
                    <p>wind {weather.wind?.speed} m/s</p>
                </> : null
            }
        </div>
    )
}

export default Country;