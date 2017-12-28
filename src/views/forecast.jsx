import React from 'react'
import {
  Redirect,
  Link,
} from 'react-router-dom'

import Weather from '../providers/WeatherProvider'

const ForecastTemplate = ({...props}) => {
  // Set our variables
  // let city = props.data.city ? props.data.city.name : false
  let list = props.data.list ? props.data.list : []
  let days = {}
  let averages = {}

  if (list.length) {
    list.forEach((forecast) => {
      let day = forecast.dt_txt.split(' ')[0]

      // If this already exists, add the forcast's values.
      // If not, add the day as they key and that day's value.
      if (days[day]) {
        days[day].push(forecast)
      } else {
        days[day] = [forecast]
      }
    })

    // Loop through the days and average everything up
    for (let day in days) {
      let length = days[day].length
      let averageTemp = 0

      console.log(length)

      days[day].forEach((forecast) => {
        // Add to the averages
        averageTemp+= forecast.main.temp
      })

      averages[day] = averageTemp/length
    }
  }

  console.log(days)
  console.log(averages)

  // Return the template
  return (
    <div className="view--forecast">
      <h1>Here's your fucking forecast:</h1>
    </div>
  )
}

const Forecast = ({match}) => (
  <Weather
    latitude={match.params.latitude}
    longitude={match.params.longitude}
    endpoint='forecast'
    render={({
               fetchingWeather,
               weatherData,
               error,
             }) =>
      fetchingWeather
        ? <p>Fucking a fortune teller...</p>
        : error
        ? <Redirect to='/404'/>
        : weatherData
          ? <ForecastTemplate match={match} data={weatherData}/>
          : ''
    }
  />
)

export default Forecast