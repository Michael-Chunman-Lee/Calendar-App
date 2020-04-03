import React, { Component } from 'react'
import './ProfileBox.css'
import DEUUEAUGH from "../../data/DEUUEAUGH.png";
import { withRouter } from 'react-router-dom'

class ProfileBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: this.props.name,
            image_url: this.props.image_url
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.image_url !== prevProps.image_url) {
            this.setState({image_url: this.props.image_url})
        }
    }
    
    render() {
        return (
            <div className="profile-box">
                <div><strong>{this.props.name}</strong></div>
                {this.state.image_url === "" ? <img className="profile-pic" src={DEUUEAUGH}/> : <img className="profile-pic" src={this.props.image_url}/>}

            </div>
        )
    }
}

export default withRouter(ProfileBox);