import React from 'react'
import { Redirect } from 'react-router-dom'

import Geolocation from 'react-geolocation'

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

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
            ? <Redirect to={`/${this.state.latitude}/${this.state.longitude}/`}/>
            : fetchingPosition
            ? <p>Being creepy...</p>
            : <p>
              <a onClick={getCurrentPosition}>Find Me.</a>
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

class SimpleForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {address: '', latLng: false}
    this.onChange = (address) => this.setState({address})
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({latLng: latLng}))
      .catch(error => console.error('Error', error))
  }

  render () {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Somewhere, USA',
    }

    if (this.state.latLng) {
      return <Redirect to={`/${this.state.latLng.lat}/${this.state.latLng.lng}/`}/>
    }

    return (
      <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete inputProps={inputProps}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

class Search extends React.Component {
  state = {showSearch: false}

  render () {
    let toggleShowSearch = () => {
      this.setState({showSearch: !this.state.showSearch})
    }
    return (
      this.state.showSearch
        ? <SimpleForm/>
        : <a onClick={toggleShowSearch}>Fuck you very much,<br/>I'll find myself.</a>

    )
  }
}

const Home = () => (
  <div className="view--home">
    <header className="app-header">
      <h1 className="app-title">What The Fuck is the Weather Like?</h1>
    </header>
    {<Finder/>}
    {<Search/>}
  </div>
)

export default Home