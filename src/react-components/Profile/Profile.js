import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import { withRouter } from 'react-router-dom'
import './Profile.css'
import Post from '../Post/Post'
import ProfileBox from '../ProfileBox/ProfileBox'
import TagBox from '../TagBox/TagBox'
import Button from '@material-ui/core/Button'
import { sourceStr } from '../../data/coursesCalendarString'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tags: {
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
                    icsRawText: sourceStr,
                },
                {
                    name: 'Robert 2',
                    tag: 'School',
                    title: 'I love UofT! Checkout my 4th year schedule!!',
                    icsRawText: sourceStr,
                },
            ],
        }
    }
    handletagClick = (event, newVal) => {
        let newState = Object.assign({}, this.state)
        newState.tags[newVal] = !newState.tags[newVal]
        this.setState(newState)
    }
    render() {
        if (this.props.location.uploadedContent) {
            this.state.posts.push(this.props.location.uploadedContent)
        }
        let filterTags = []
        Object.keys(this.state.tags).map(
            k => this.state.tags[k] && filterTags.push(k)
        )

        let name
        if (this.props.location.profilename) {
            name = this.props.location.profilename
        } else {
            name = this.props.location.username
        }

        return (
            <div className="main-div">
                <NavBar
                    username={this.props.location.username}
                    userType={this.props.location.userType}
                ></NavBar>
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
                                        <Post
                                            username={
                                                this.props.location.username
                                            }
                                            userType={
                                                this.props.location.userType
                                            }
                                            key={i}
                                            post={post}
                                        ></Post>
                                    )
                            )}
                        </div>
                    </div>
                    {
                        //Api call to get profile info (if not current user profile)
                    }
                    <div className="right-content">
                        {this.props.location.username === name && (
                            <Button
                                id="createScheduleButton"
                                onClick={e => {
                                    this.props.history.push({
                                        pathname: '../uploadPost',
                                        name: this.props.location.username,
                                    })
                                }}
                            >
                                Create a new schedule
                            </Button>
                        )}

                        <TagBox
                            tags={this.state.tags}
                            handletagClick={this.handletagClick}
                        ></TagBox>
                        <ProfileBox name={name}></ProfileBox>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile)
