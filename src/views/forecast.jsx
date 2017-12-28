import React from 'react'
import {
  Link,
} from 'react-router-dom'

const Forecast = ({...props}) => {
  // Set our variables
  let summary = props.data.daily.summary

  // Return the template
  return (
    <div className="view--forecast">
      <h1>Here's your fucking forecast:</h1>
      <p>{summary}</p>
      <p><Link to={`/${props.match.params.latitude}/${props.match.params.longitude}/`}>This is overrated</Link></p>
      <p><Link to="/">I moved</Link></p>
    </div>
  )
}

export default Forecast