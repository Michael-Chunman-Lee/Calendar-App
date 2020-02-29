import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import './AdminDashboard.css'

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';

export default class AdminDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users : [{user:"TheLegend76", email:"thelegend76@gmail.com", created:"01/20/2020"},
                                 {user:"CerealWithMilk", email:"itsjustcereal@hotmail.com", created:"01/20/2020"},
                                 {user:"BananaApple5", email:"banana@gmail.com", created:"01/20/2020"},
                                 {user:"anotheruser2", email:"anotheruser2@gmail.com", created:"01/20/2020"}]
            
        }
    }

    removeUser(user) {
        let filteredUsers = this.state.users.filter(s => {
            return s !== user;
        });
        
        this.setState({
            users: filteredUsers
        });
    }
    

    render() {
        // We have a list of objects meant to represent each user, eventually, this data will be
        // extracted from our backend
        
        return (
            <div className="main-div">
                <NavBar></NavBar>
                <p className="pageHeading"> Admin Dashboard </p>
                <div className="content">
                    
                    <table id="userTable">
                        <thead>
                            <tr>
                                <th style={{width:"20%"}}> Username </th>
                                <th style={{width:"30%"}}> Email </th>
                                <th style={{width:"20%"}}> Created On </th>
                                <th style={{width:"30%"}}></th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map((user, i) => (
                            <tr className={user.email}>
                                <td className="usernameCell" >
                                    <form class="cellForm" action="/user/*"><button className="btn">{user.user}</button></form>
                                </td>
                                <td className="emailCell" >
                                    <form class="cellForm" action="/user/*"><button className="btn">{user.email}</button></form>
                                </td>
                                <td className="dateCreatedCell" >
                                    <form class="cellForm" action="/user/*"><button className="btn" type="submit">{user.created}</button></form>
                                </td>
                                
                                <td className="removeUserCell">
                                    <IconButton onClick={this.removeUser.bind(this, user)} color="inherit" className="removeUserButton">
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