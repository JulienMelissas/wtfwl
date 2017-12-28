// React
import React from 'react'

// React Router
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

// Styles
import 'sanitize.css'
import './App.css'

// Our Views
import Home from './Home'
import Weather from './Weather'
import FourOhFour from './views/404'

const App = () => (
  <Router>
    <div className="wrap">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/:latitude/:longitude/" component={Weather}/>
        <Route component={FourOhFour}/>
      </Switch>
    </div>
  </Router>
)
export default App