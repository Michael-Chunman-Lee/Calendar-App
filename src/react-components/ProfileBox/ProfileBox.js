import React, { Component } from 'react'
import './ProfileBox.css'
import DEUUEAUGH from "../../data/DEUUEAUGH.png";
import { withRouter } from 'react-router-dom'

class ProfileBox extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        console.log(this.props.location.name)
        this.state = {}
    }

    render() {
        return (
            <div className="profile-box">
                <div><strong>{this.props.name}</strong></div>
                <img className="profile-pic" src={DEUUEAUGH}/>

            </div>
        )
    }
}

export default withRouter(ProfileBox);