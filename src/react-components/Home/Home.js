import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import './Home.css'
import Post from '../Post/Post'
import ProfileBox from '../ProfileBox/ProfileBox'
import FlairBox from '../FlairBox/FlairBox'
import {withRouter} from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props)

        //This will represent the currently signed in user data
        this.state = {
            name: 'Robert',
        }
    }

    render() {
        return (
            <div className="home-main-div">
                <NavBar name={this.state.name}></NavBar>
                <div className="home-content">
                    <div className="home-middle-content">
                        <div className="home-filter-toolbar">
                            <span> Top </span>
                            <span> New </span>
                        </div>
                        <div className="home-posts">
                            <Post title="My Grandfather turns the big 100 today!! Checkout his workout schedule!!"></Post>
                            <Post title="title"></Post>
                        </div>
                    </div>
                    <div className="home-right-content">
                        <FlairBox></FlairBox>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);