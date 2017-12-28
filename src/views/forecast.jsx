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

      <footer>
        <p className="small"><Link to={`/${props.match.params.latitude}/${props.match.params.longitude}/play-by-play`}>I want a fucking play-by-play.</Link></p>
        <p className="small"><Link to={`/${props.match.params.latitude}/${props.match.params.longitude}/`}>The Future Sucks.</Link></p>
        <p className="small"><Link to="/">I moved.</Link></p>
      </footer>
    </div>
  )
}

export default Forecast