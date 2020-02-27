import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import './Home.css'
import Post from '../Post/Post'
import ProfileBox from '../ProfileBox/ProfileBox'
export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className="main-div">
                <NavBar></NavBar>
                <div className="content">
                    <div className="middle-content">
                        <div className="filter-toolbar">
                            <span> Top </span>
                            <span> New </span>
                        </div>
                        <div className="posts">
                            <Post title="My Grandfather turns the big 100 today!! Checkout his workout schedule!!"></Post>
                            <Post title="title"></Post>
                        </div>
                    </div>
                    <div className="right-content">
                        <ProfileBox name="Robert"></ProfileBox>
                    </div>
                </div>
            </div>
        )
    }
}
