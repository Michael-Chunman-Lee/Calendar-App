import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import './AdminDashboard.css'

export default class AdminDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        // We have a list of objects meant to represent each user, eventually, this data will be
        // extracted from our backend
        let users = [{user:"TheLegend76", email:"thelegend76@gmail.com", created:"01/20/2020"},
                     {user:"CerealWithMilk", email:"itsjustcereal@hotmail.com", created:"01/20/2020"},
                     {user:"BananaApple5", email:"banana@gmail.com", created:"01/20/2020"},
                     {user:"anotheruser2", email:"anotheruser2@gmail.com", created:"01/20/2020"}]
        
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
                        {users.map(user => (
                            <tr key={user.email}>
                                <td style={{width:"20%"}}> {user.user} </td>
                                <td style={{width:"30%"}}> {user.email} </td>
                                <td style={{width:"20%"}}> {user.created} </td>
                                <td style={{width:"30%"}}></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}