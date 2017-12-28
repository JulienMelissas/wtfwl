import React from 'react'
import {
  Redirect,
  Link,
} from 'react-router-dom'

import Weather from '../providers/WeatherProvider'

// Temp Component
const Temp = ({...props}) => {
  return Math.round(props.temp)
}

const CurrentTemplate = ({...props}) => {
  // Set our variables
  let temp = props.data.currently.apparentTemperature
  let summary = props.data.currently.summary

  // As long as we have our data
  if (temp)
    return (
      <div className="view--current">
        <h1>It's <Temp temp={temp}/> fucking degrees and {summary}</h1>
        <p><Link to={`/${props.match.params.latitude}/${props.match.params.longitude}/forecast`}>Show me the future</Link></p>
        <p><Link to="/">I moved</Link></p>
      </div>
    )

  // Always return something
  return ''
}

const Current = ({match}) => (
  <Weather
    latitude={match.params.latitude}
    longitude={match.params.longitude}
    render={({
               fetchingWeather,
               weatherData,
               error,
             }) =>
      fetchingWeather
        ? <p>Fetching the weather...</p>
        : error
        ? <Redirect to='/404'/>
        : weatherData
          ? <CurrentTemplate match={match} data={weatherData}/>
          : ''
    }
  />
)

export default Current