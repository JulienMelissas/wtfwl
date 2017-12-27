import React from 'react'
import {
  Redirect,
  Link,
} from 'react-router-dom'

import WeatherProvider from '../providers/WeatherProvider'

// Temp Component
const Temp = ({...props}) => {
  if (props.temp)
    return `${Math.round(props.temp)}°`
  return ''
}

const CurrentTemplate = ({...props}) => {
  // Set our variables
  let temp = props.data.main ? props.data.main.temp : false
  let location = props.data.name ? props.data.name : false

  // As long as we have our data
  if (temp && location)
    return (
      <div className="view--current">
        <h1>It's fucking <Temp temp={temp}/> in {location}</h1>
        <p><Link to={`${props.match.url}/forecast`}>Show me the future</Link></p>
        <p><Link to="/">I moved</Link></p>
      </div>
    )

  // Always return something
  return ''
}

const Current = ({match}) => (
  <WeatherProvider
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