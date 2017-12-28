import React from 'react'
import {
  Redirect,
  Link,
} from 'react-router-dom'

import Weather from '../providers/WeatherProvider'

// Temp Component
const Temp = ({...props}) => {
  if (props.temp)
    return `${Math.round(props.temp)}°`
  return ''
}

const CurrentTemplate = ({...props}) => {
  // Set our variables
  let temp = props.data.currently ? props.data.currently.apparentTemperature : false
  let summary = props.data.currently ? props.data.currently.summary : false

  // As long as we have our data
  if (temp)
    return (
      <div className="view--current">
        <h1>It's (temp) as fuck</h1>
        <p><Temp temp={temp}/> and {summary}</p>
        <small><Link to={`/${props.match.params.latitude}/${props.match.params.longitude}/forecast`}>Show me the future</Link></small>
        <small><Link to="/">I moved</Link></small>
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