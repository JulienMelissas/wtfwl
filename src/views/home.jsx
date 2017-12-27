import React from 'react'

import { Redirect } from 'react-router-dom'

import Geolocation from 'react-geolocation'

class Finder extends React.Component {
  state = {latitude: '', longitude: ''}

  render () {
    return (
      <Geolocation
        lazy
        onSuccess={
          (position) => this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
        }
        render={({
                   fetchingPosition,
                   error,
                   getCurrentPosition
                 }) =>
          this.state.latitude && this.state.longitude
            ? <Redirect to={`/${this.state.latitude}/${this.state.longitude}`}/>
            : fetchingPosition
            ? <p>Being creepy...</p>
            : <p>
              <a onClick={getCurrentPosition}>Find Me</a>
              {fetchingPosition}
              {error &&
              <p>
                {error.message}
              </p>
              }
            </p>
        }
      />
    )
  }
}

const Home = () => (
  <div className="view--home">
    <header className="app-header">
      <h1 className="app-title">What The Fuck is the Weather Like?</h1>
    </header>
    {<Finder/>}
  </div>
)

export default Home