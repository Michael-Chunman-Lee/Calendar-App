import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import {Link, withRouter} from "react-router-dom";
import './AdminDashboard.css'

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';

class AdminDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users : [{user:"TheLegend76", email:"thelegend76@gmail.com", created:"01/20/2020"},
                                 {user:"CerealWithMilk", email:"itsjustcereal@hotmail.com", created:"01/20/2020"},
                                 {user:"BananaApple5", email:"banana@gmail.com", created:"01/20/2020"},
                                 {user:"anotheruser2", email:"anotheruser2@gmail.com", created:"01/20/2020"}]
            
        }
    }
    
    redirectToUser(user) {
        this.props.history.push({
          pathname:"./user/" + user.user,
          userType: "admin"
        })
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
                                    <button onClick={this.redirectToUser.bind(this,user)} className="btn">{user.user}</button>
                                </td>
                                <td className="emailCell" >
                                    <button onClick={this.redirectToUser.bind(this,user)} className="btn">{user.email}</button>
                                </td>
                                <td className="dateCreatedCell" >
                                    <button onClick={this.redirectToUser.bind(this,user)} className="btn" type="submit">{user.created}</button>
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


export default withRouter(AdminDashboard);