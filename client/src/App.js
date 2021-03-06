import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import './App.css'

import Login from './react-components/Login/Login'
import Signup from './react-components/Signup/Signup'
import ForgotPassword from './react-components/ForgotPassword/ForgotPassword'
import Home from './react-components/Home/Home'
import AdminDashboard from './react-components/AdminDashboard/AdminDashboard'
import Profile from './react-components/Profile/Profile'
import UploadPost from './react-components/UploadPost/UploadPost'
import SpecificPost from './react-components/PostRatings/SpecificPost'
import {readCookie} from "./actions/user"

class App extends React.Component {

    constructor(props) {
        super(props)
        readCookie(this)
    }

    state = {
        currentUser: null, 
        isAdmin: false,
        userID: null
    }

    render() {
        const {currentUser, isAdmin, userID} = this.state

        return (
            <BrowserRouter>
                <Switch>
                    <Route 
                        exact path={["/", "/home"]}
                        render={({history}) => (
                            <div className="App">
                                {!currentUser ? <Login history={history} app={this}/> : <Home history={history} app={this}/>}
                            </div>
                        )}
                    />

                    <Route 
                        exact path="/signup" 
                        render={({history}) => (
                            <div className="App">
                                {!currentUser ? <Signup history={history} app={this}/> : <Home history={history} app={this}/>}
                            </div>
                        )}
                    />

                    <Route 
                        exact path="/admindashboard" 
                        render={({history}) => (
                            <div className="App">
                                {!currentUser ? <Login history={history} app={this}/> : 
                                !isAdmin ? <Home history={history} app={this}/> : <AdminDashboard app={this} history={history}/>}
                            </div>
                        )}
                    />

                    <Route
                        exact path="/forgotPassword"
                        render={({history}) => (
                            <div className="App">
                                {!currentUser ? <ForgotPassword history={history} app={this}/> : <Home history={history} app={this}/>}
                            </div>
                        )}
                    />

                    <Route
                        exact path="/user/:profileName"
                        render={(props) => (
                            <div className="App">
                                {!currentUser ? <Signup history={props.history} app={this}/> : <Profile history={props.history} app={this} profileName={props.match.params.profileName}/>}
                            </div>
                        )}
                    />

                    <Route
                        exact path="/uploadPost"
                        render={({history}) => (
                            <div className="App">
                                {!currentUser ? <Signup history={history} app={this}/> : <UploadPost history={history} app={this}/>}
                            </div>
                        )}
                    />

                    <Route
                        exact path="/specificPost/:id"
                        render={({history, match}) => (
                            <div className="App">
                                {!currentUser ? <Signup history={history} app={this}/> : <SpecificPost history={history} app={this} postId={match.params.id}/>}
                            </div>
                        )}                           
                    />


                    <Route render={() => <div>404 not found</div>}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App