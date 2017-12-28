import React from 'react'
import {
  Link,
} from 'react-router-dom'

import Temp from '../partials/temp'

const Current = ({...props}) => {
  // Set our variables
  let temp = props.data.currently.temperature
  let summary = props.data.currently.summary

  return (
    <div className="view--current">
      <h1>It's <Temp temp={temp}/> fucking degrees and {summary}</h1>

      <footer>
        <p className="small"><Link to={`/${props.match.params.latitude}/${props.match.params.longitude}/forecast`}>Show me the future.</Link></p>
        <p className="small"><Link to="/">I moved.</Link></p>
      </footer>
    </div>
  )
}

export default Current