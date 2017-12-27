import React from 'react'

import { Link } from 'react-router-dom'

const FourOhFour = () => (
  <div className="view-404">
    <h1>
      Well fuck,<br/>
      You Broke It.
    </h1>
    <Link to="/">Go home.</Link>
  </div>
)

export default FourOhFour