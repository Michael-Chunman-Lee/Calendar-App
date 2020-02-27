import React, { Component } from 'react'
import './ProfileBox.css'

export default class ProfileBox extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className="profile-box">
                <div> Image </div>
                <div> {this.props.name} </div>
            </div>
        )
    }
}
