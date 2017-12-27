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
import Home from './views/home'
import FourOhFour from './views/404'

// Location View/Controller
import Location from './Location'

const App = () => (
  <Router>
    <div className="wrap">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/:location" component={Location}/>
        <Route component={FourOhFour}/>
      </Switch>
    </div>
  </Router>
)
export default App