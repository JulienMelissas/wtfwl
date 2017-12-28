import React from 'react'
import {
  Redirect,
  Link,
} from 'react-router-dom'

import Weather from '../providers/WeatherProvider'

import 'moment'

const ForecastTemplate = ({...props}) => {
  // Set our variables
  let summary = props.data.daily.summary

  // Return the template
  return (
    <div className="view--forecast">
      <h1>Here's your fucking forecast:</h1>
      <p>{summary}</p>
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