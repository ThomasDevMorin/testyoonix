import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import Auth from "./components/Auth"

function App() {
  return (
    <Router>
      <div className="App b-dark-blue">
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/auth" component={Auth} />
      </div>
    </Router>
  );
}

export default App;
