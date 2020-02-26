import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import './Home.css'
import Post from '../Post/Post'
export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className="main-div">
                <NavBar></NavBar>
                <div className="filter-toolbar">
                    <span> Top </span>
                    <span> New </span>
                </div>
                <div className="posts">
                    <Post></Post>
                    <Post></Post>
                </div>
            </div>
        )
    }
}
