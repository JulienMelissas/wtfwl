import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import ScrollToTop from './ScrollToTop'

import ReactGA from 'react-ga';

// Styles
import 'sanitize.css'
import './App.css'

// Our Views
import Home from './Home'
import Weather from './Weather'
import FourOhFour from './views/404'

// Google Analytics
ReactGA.initialize('UA-21923051-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => (
  <Router>
    <ScrollToTop>
      <div className="wrap">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/:latitude/:longitude/" component={Weather}/>
          <Route component={FourOhFour}/>
        </Switch>
      </div>
    </ScrollToTop>
  </Router>
)
export default App