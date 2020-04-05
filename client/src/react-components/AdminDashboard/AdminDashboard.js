import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import { withRouter } from 'react-router-dom'
import './AdminDashboard.css'

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

class AdminDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // This information will eventually be obtained from the backend
            // In the meantime, we will use mock objects
            searchQuery : "",
            dbusers: [],
        }
    }

    getData() {
        console.log(this)
        const request = new Request("/users", {
            method: "get",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })

        fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.users !== undefined) {
                this.setState({ dbusers: json.users.sort((a,b) => {
                    var nameA = a.username.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.username.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  
                    // names must be equal
                    return 0;
                })});
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount()  {
        this.getData();
    }

    updateSearchQuery = searchBarText => {
        this.setState({ searchQuery: searchBarText}) 
    }

    userPassesSearchQuery = user => {
        return this.state.searchQuery === "" ||
            user.username.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    }

    redirectToUser(user) {
        this.props.history.push({
            pathname: './user/' + user.username,
        })
    }

    removeUser(user) {
        return fetch("/users/" + user._id, {
            method: "delete"
        })
        .then(response => {
            this.getData()
            fetch("/images/" + user.username, {
                method: "get"
            })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
            })
            .then(json => {
                if (json) {
                    fetch("/images/" + json.image_id, {
                        method: "delete"
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
            })
            .catch(error => {
                console.log(error)
            }) 
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        // We have a list of objects meant to represent each user, eventually, this data will be
        // extracted from our backend
        const {app, history} = this.props
        return (
            <div className="main-div">
                <NavBar
                    app={app}
                    history={history}
                    searchCallback={this.updateSearchQuery}
                ></NavBar>
                <p className="pageHeading"> Admin Dashboard </p>
                <div className="content">
                    <table id="userTable">
                        <thead>
                            <tr>
                                <th className="w20" > Username </th>
                                <th className="w30" > Email </th>
                                <th className="w20" ></th>
                                <th className="w30" ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.dbusers.map((user, i) => this.userPassesSearchQuery(user) && (
                                <tr className={user.email}>
                                    <td className="usernameCell">
                                        <button
                                            onClick={this.redirectToUser.bind(
                                                this,
                                                user
                                            )}
                                            className="btn"
                                        >
                                            {user.username}
                                        </button>
                                    </td>
                                    <td className="emailCell">
                                        <button
                                            onClick={this.redirectToUser.bind(
                                                this,
                                                user
                                            )}
                                            className="btn"
                                        >
                                            {user.email}
                                        </button>
                                    </td>
                                    <td className="dateCreatedCell">
                                        <button
                                            onClick={this.redirectToUser.bind(
                                                this,
                                                user
                                            )}
                                            className="btn"
                                            type="submit"
                                        >
                                            <div className="pH"> {"_"} </div>
                                        </button>
                                    </td>

                                    <td className="removeUserCell">
                                        <IconButton
                                            onClick={this.removeUser.bind(
                                                this,
                                                user
                                            )}
                                            disabled={user.isAdmin}
                                            color="inherit"
                                            className="removeUserButton"
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminDashboard)