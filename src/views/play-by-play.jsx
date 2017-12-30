import React from 'react'
import {
  Link,
} from 'react-router-dom'

import Moment from 'react-moment'

import Temp from '../partials/temp'

const Day = ({...props}) => {
  let day = <Moment date={props.data.time * 1000} format="dddd"/>
  let summary = props.data.summary
  let temperatureHigh = props.data.temperatureHigh
  let temperatureLow = props.data.temperatureLow

  return (
    <p className="day">
      {day}: {summary}<br/>
      <small>High: <Temp temp={temperatureHigh} showDegrees/> | Low: <Temp temp={temperatureLow} showDegrees/></small>
    </p>
  )
}

const PlayByPlay = ({...props}) => {
  // Set our variables
  let days = props.data.daily.data

  // Return the template
  return (
    <div className="view--play-by-play">
      <h1>Here, just have it</h1>
      {days.map((day, key) => {
        return <Day key={key} data={day} tomorrow={key === 0} />
      })}

      <footer>
        <p className="small"><Link to={`/${props.match.params.latitude}/${props.match.params.longitude}/forecast`}>Details Suck.</Link></p>
        <p className="small"><Link to="/">I moved.</Link></p>
      </footer>
    </div>
  )
}

export default PlayByPlay