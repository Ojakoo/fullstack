import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const [ responseObj, setResponseObj ] = useState([])
    const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: {capital},
        units: 'm'
    }

    console.log(params.access_key)

    useEffect(() => {
        axios 
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                setResponseObj(response.data)
                console.log(response.data.current.temperature)
            })
    }, [])

    
    if (responseObj.length === 0) {
        return (
            <div>
                <h3>Weather in {capital}</h3>
                <div>...</div>
            </div>
        )
    }

    return (
        <div>
            <h3>Weather in {capital}</h3>
            <div><b>temperature:</b> {responseObj.current.temperature} Celcius</div>
            <img src={responseObj.current.weather_icons} height={75} alt={responseObj.current.weather_descriptions}/>
            <div><b>wind:</b> {responseObj.current.wind_speed} m/s direction {responseObj.current.wind_dir}</div>
        </div>
    )
}

export default Weather