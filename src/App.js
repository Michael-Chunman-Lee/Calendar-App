import React from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import './App.css';

import Login from "./react-components/Login/Login";

class App extends React.Component  {
  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() =>
              <Login/>}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
