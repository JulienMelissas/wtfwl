import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import WeatherProvider from './providers/WeatherProvider'

import Forecast from './views/forecast'
import Current from './views/current'
import PlayByPlay from './views/play-by-play'

const Weather = ({match}) => (
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
          ?
          <Switch>
            <Route exact path="/:latitude/:longitude/forecast" component={() => <Forecast match={match} data={weatherData}/>}/>
            <Route exact path="/:latitude/:longitude/play-by-play" component={() => <PlayByPlay match={match} data={weatherData}/>}/>
            <Route path="/:latitude/:longitude/" render={() => <Current match={match} data={weatherData}/>}/>
          </Switch>
          : ''
    }
  />
)

export default Weather