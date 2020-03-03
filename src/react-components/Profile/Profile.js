import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import { withRouter } from 'react-router-dom'
import './Profile.css'
import Post from '../Post/Post'
import ProfileBox from '../ProfileBox/ProfileBox'
import TagBox from '../TagBox/TagBox'
import Button from '@material-ui/core/Button'
import { sourceStr } from '../../data/coursesCalendarString'
import SortBox from '../SortBox/SortBox'

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
            sortPosts: {
                Top: false,
                New: false
            }, 
            name: 'Robert',
            posts: [
                {
                    name: this.props.location.username,
                    tag: 'Gaming',
                    title: 'Check out my pro gaming schedule',
                    icsRawText: sourceStr,
                    date: new Date(2018, 11, 24, 10, 33, 30, 0),
                    viewCount: 20,
                },
                {
                    name: this.props.location.username,
                    tag: 'Fitness',
                    title:
                        'My Grandfather turns the big 100 today!! Checkout his workout schedule!!',
                    icsRawText: sourceStr,
                    date: new Date(2019, 11, 24, 10, 33, 30, 0),
                    viewCount: 10
                },
                {
                    name: this.props.location.username,
                    tag: 'School',
                    title: 'I love UofT! Checkout my 4th year schedule!!',
                    icsRawText: sourceStr,
                    date: new Date(2016, 11, 24, 10, 33, 30, 0),
                    viewCount: 1000000
                },
            ],
        }
        if (this.props.location.uploadedContent) {
            this.state.posts.push(this.props.location.uploadedContent)
        }
    }

    handletagClick = (event, newVal) => {
        let newState = Object.assign({}, this.state)
        newState.tags[newVal] = !newState.tags[newVal]
        this.setState(newState)
    }

    handleSortClick = (event, newVal) => {
        if ((this.state.sortPosts["Top"] && newVal === "New") || (this.state.sortPosts["New"] && newVal === "Top")) return;
        let newState = Object.assign({}, this.state);
        newState.sortPosts[newVal] = !newState.sortPosts[newVal]
        if (newState.sortPosts["Top"]) {
            newState.posts.sort((a,b) => b.viewCount - a.viewCount)
        } else if (newState.sortPosts["New"]) {
            newState.posts.sort((a,b) => b.date - a.date);
        }
        console.log(newState.posts)
        this.setState(newState)
    }

    checkSortClicked = () => {
        return (this.state.sortPosts["Top"] || this.state.sortPosts["New"])
    }

    render() {
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
                            <SortBox sortPosts={this.state.sortPosts} handleSortClick={this.handleSortClick}/>
                        </div>
                        {
                            //Will need API calls to get posts based on filter
                        }
                        <div className="posts">
                            {this.state.posts.map(
                                (post, i) =>
                                this.checkSortClicked() && (filterTags.includes(post.tag) ||
                                        filterTags.length === 0) && (
                                        <Post
                                            username={
                                                this.props.location.username
                                            }
                                            userType={
                                                this.props.location.userType
                                            }
                                            key={i}
                                            post={{
                                                name: this.props.location.username,
                                                tag: post.tag,
                                                title: post.title,
                                                icsRawText: post.icsRawText,
                                                viewCount: post.viewCount,
                                                date: post.date
                                            }}
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
                                        userType: this.props.location.userType,
                                        username: this.props.location.username
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
