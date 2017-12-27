import React from 'react'

const Location = ({match}) => (
  <div className="view--location">
    <h1>Getting the weather...</h1>
    <p>{match.params.location}</p>
  </div>
)

export default Location