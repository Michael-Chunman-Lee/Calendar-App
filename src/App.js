import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import './App.css'

import Login from './react-components/Login/Login'
import Signup from './react-components/Signup/Signup'
import ForgotPassword from './react-components/ForgotPassword/ForgotPassword'
import ScheduleCalendar from './react-components/Calendar/Calendar'
import Home from './react-components/Home/Home'
import Profile from './react-components/Profile/Profile'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" render={() => <Signup />} />
                        <Route exact path="/login" render={() => <Login />} />
                        <Route
                            exact
                            path="/forgotPassword"
                            render={() => <ForgotPassword />}
                        />
                        <Route
                            exact
                            path="/calendar"
                            render={() => <ScheduleCalendar />}
                        />
                        <Route exact path="/home" render={() => <Home />} />
                        <Route
                            exact
                            path="/user/*"
                            render={() => <Profile />}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App
