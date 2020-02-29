import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import { withRouter } from 'react-router-dom'
import './Profile.css'
import Post from '../Post/Post'
import ProfileBox from '../ProfileBox/ProfileBox'
import FlairBox from '../FlairBox/FlairBox'
import Button from '@material-ui/core/Button'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            flairs: {
                Fitness: false,
                Gaming: false,
                School: false,
                Food: false,
            },
            name: 'Robert',
            posts: [
                {
                    name: 'Robert',
                    tag: 'Fitness',
                    title:
                        'My Grandfather turns the big 100 today!! Checkout his workout schedule!!',
                },
                {
                    name: 'Robert 2',
                    tag: 'School',
                    title: 'I love UofT! Checkout my 4th year schedule!!',
                },
            ],
        }
    }
    handleFlairClick = (event, newVal) => {
        let newState = Object.assign({}, this.state)
        newState.flairs[newVal] = !newState.flairs[newVal]
        this.setState(newState)
    }
    render() {
        if (this.props.location.uploadedContent) {
            this.state.posts.push(this.props.location.uploadedContent)
        }
        let filterTags = []
        Object.keys(this.state.flairs).map(
            k => this.state.flairs[k] && filterTags.push(k)
        )
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
                            {this.state.posts.map(
                                (post, i) =>
                                    (filterTags.includes(post.tag) ||
                                        filterTags.length === 0) && (
                                        <Post key={i} post={post}></Post>
                                    )
                            )}
                        </div>
                    </div>
                    {
                        //Api call to get profile info (if not current user profile)
                    }
                    <div className="right-content">
                        <Button
                            id="createScheduleButton"
                            onClick={e => {
                                this.props.history.push({
                                    pathname: '../uploadPost',
                                    name: this.state.name,
                                })
                            }}
                        >
                            Create a new schedule
                        </Button>
                        <FlairBox
                            flairs={this.state.flairs}
                            handleFlairClick={this.handleFlairClick}
                        ></FlairBox>
                        <ProfileBox name={this.state.name}></ProfileBox>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile)
