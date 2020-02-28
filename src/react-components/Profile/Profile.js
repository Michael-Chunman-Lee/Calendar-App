import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import {withRouter} from "react-router-dom";
import './Profile.css'
import Post from '../Post/Post'
import ProfileBox from '../ProfileBox/ProfileBox'
import FlairBox from '../FlairBox/FlairBox'
import Button from "@material-ui/core/Button";

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'Robert',
        }
    }

    render() {
        return (
            <div className="main-div">
                <NavBar name={this.state.name}></NavBar>
                <div className="content">
                    <div className="middle-content">
                        <div className="filter-toolbar">
                            <span> Top </span>
                            <span> New </span>
                        </div>
                        {
                            //Will need API calls to get posts based on filter
                        }
                        <div className="posts">
                            <Post title="My Grandfather turns the big 100 today!! Checkout his workout schedule!!"></Post>
                            <Post title="title"></Post>
                        </div>
                    </div>
                    {
                        //Api call to get profile info (if not current user profile)
                    }
                    <div className="right-content">
                        <Button id="createScheduleButton" onClick={e => {this.props.history.push("../uploadPost")}}>Create a new schedule</Button>
                        <FlairBox></FlairBox>
                        <ProfileBox name="Robert"></ProfileBox>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile);