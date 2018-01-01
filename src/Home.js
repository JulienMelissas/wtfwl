import React from 'react'
import { Redirect } from 'react-router-dom'

import Geolocation from 'react-geolocation'

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

class Finder extends React.Component {
  state = {latitude: '', longitude: '', error: false}

  render () {
    return (
      <Geolocation
        lazy
        onError={
          () => {this.setState({error: true})}
        }
        onSuccess={
          (position) => this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
        }
        render={({
                   fetchingPosition,
                   getCurrentPosition
                 }) =>
          this.state.latitude && this.state.longitude
            ? <Redirect push to={`/${this.state.latitude}/${this.state.longitude}/`}/>
            : fetchingPosition
            ? <p>Being creepy...</p>
            : this.state.error
              ? <p>Not allowed to find you :(</p>
              : <p>
                <a onClick={getCurrentPosition}>Find Me.</a>
                {fetchingPosition}
              </p>
        }
      />
    )
  }
}

class AutocompleteForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {address: '', latLng: false}
    this.onChange = (address) => this.setState({address})
  }

  handleFormSubmission = (event) => {
    event.preventDefault()
    this.handleLocationSelection()
  }

  handleLocationSelection = () => {
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({latLng: latLng}))
      .catch(error => console.error('Error', error))
  }

  render () {
    const cssClasses = {
      root: 'autocomplete-form',
      input: 'autocomplete-input',
      autocompleteContainer: 'autocomplete-container',
    }

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Somewhere, USA',
      autoFocus: true,
      name: 'autocomplete-input',
      id: 'autocomplete-input',
    }

    const AutocompleteItem = ({formattedSuggestion}) => (
      <div className="autocomplete-suggestion">
        <span className="autocomplete-suggestion--main">{formattedSuggestion.mainText}</span>
        <small className="autocomplete-suggestion--secondary muted">{formattedSuggestion.secondaryText}</small>
      </div>
    )

    if (this.state.latLng) {
      return <Redirect push to={`/${this.state.latLng.lat}/${this.state.latLng.lng}/`}/>
    }

    return (
      <form onSubmit={this.handleFormSubmission}>
        <PlacesAutocomplete
          classNames={cssClasses}
          onSelect={this.handleLocationSelection}
          inputProps={inputProps}
          autocompleteItem={AutocompleteItem}
        />
        <button type="submit" style={{display: 'none'}}>Find Location</button>
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
        ? <AutocompleteForm/>
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