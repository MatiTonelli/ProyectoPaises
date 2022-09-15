import './App.css';
import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage.jsx'
import CountryDetail from './components/CountryDetail/CountryDetail.jsx'
import Home from './components/Home/Home.jsx'
import CreateActivity from './components/CreateActivity/CreateActivity.jsx'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/countries" component={Home} />
        <Route path="/countries/:id" component={CountryDetail} />
        <Route path="/activities" component={CreateActivity} />
      </Router>
    </React.Fragment>
  );
}

export default App;
