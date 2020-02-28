import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import './SpecificPost.css'
import Post from '../Post/Post'
import ProfileBox from '../ProfileBox/ProfileBox'
import FlairBox from '../FlairBox/FlairBox'

import RatingForm from './RatingForm'

export default class SpecificPost extends Component {
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
                        <div className="posts">
                            <Post title="My Grandfather turns the big 100 today!! Checkout his workout schedule!!"></Post>
                        </div>
                        <RatingForm></RatingForm>
                    </div>
                    {
                        //Api call to get profile info (if not current user profile)
                    }
                </div>
            </div>
        )
    }
}
