import React from 'react'

const Current = ({match}) => (
  <div className="view--current">
    Location: {match.params.location}
  </div>
)

export default Current