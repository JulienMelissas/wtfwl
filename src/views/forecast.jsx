import React from 'react'

const Forecast = ({match}) => (
  <div className="view--forecast">
    Forecast for...<br/>
    Location: {match.params.location}
  </div>
)

export default Forecast