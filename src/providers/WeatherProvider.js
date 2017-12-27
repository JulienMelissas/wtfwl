import React from 'react'

// Set the WEATHER API KEY
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

class WeatherProvider extends React.Component {
  state = {
    fetchingWeather: true,
    weatherData: false,
    error: false,
  }

  getWeather = function (apikey, latitude, longitude) {
    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apikey}`, {cache: 'no-cache'})
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apikey}`)
      .then(response => response.json())
      .then(data => this.setState({weatherData: data}))
      .catch(error => this.setState({error: error}))

    this.setState({fetchingWeather: false})
  }

  componentWillMount () {
    if (WEATHER_API_KEY) {
      if (this.props.latitude && this.props.longitude) {
        this.getWeather(WEATHER_API_KEY, this.props.latitude, this.props.longitude)
      }
    } else {
      console.warn('You need to have a valid API KEY using the env variable REACT_APP_WEATHER_API_KEY')
    }
  }

  render () {
    console.log('Weather Data: ', this.state.weatherData)

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