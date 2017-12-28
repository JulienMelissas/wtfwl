import React from 'react'

import fetchJsonp from 'fetch-jsonp';

// Set the WEATHER API KEY
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

class WeatherProvider extends React.Component {
  state = {
    fetchingWeather: true,
    weatherData: false,
    error: false,
  }

  getWeather = function (apikey, endpoint, latitude, longitude) {
    fetchJsonp(`https://api.darksky.net/forecast/${apikey}/${latitude},${longitude}/?exclude=minutely,hourly`)
      .then(response => response.json())
      .then(data => this.setState({weatherData: data}))
      .catch(error => this.setState({error: error}))

    this.setState({fetchingWeather: false})
  }

  componentWillMount () {
    if (WEATHER_API_KEY) {
      if (this.props.latitude && this.props.longitude) {
        this.getWeather(WEATHER_API_KEY, this.props.endpoint, this.props.latitude, this.props.longitude)
      }
    } else {
      console.warn('You need to have a valid Dark Sky API KEY added using the env variable REACT_APP_WEATHER_API_KEY')
    }
  }

  render () {
    if (!this.props.render) {
      return null
    }
    return (
      this.props.render({
        fetchingWeather: this.state.fetchingWeather,
        weatherData: this.state.weatherData,
        error: this.state.error,
      }) || null
    )
  }
}

export default WeatherProvider