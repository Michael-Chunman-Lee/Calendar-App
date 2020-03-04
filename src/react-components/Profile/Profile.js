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
            searchQuery: '',
            tags: {
                Fitness: false,
                Gaming: false,
                School: false,
                Food: false,
            },
            sortPosts: {
                Top: false,
                New: false,
            },
            name: 'Robert',
            //Api call will need to be made to retrieve this data from a database
            posts: [
                {
                    id: 0,
                    name: this.props.location.username,
                    tag: 'Gaming',
                    title: 'Check out my pro gaming schedule',
                    icsRawText: sourceStr,
                    date: new Date(2018, 11, 24, 10, 33, 30, 0),
                    viewCount: 20,
                },
                {
                    id: 1,
                    name: this.props.location.username,
                    tag: 'Fitness',
                    title:
                        'My Grandfather turns the big 100 today!! Checkout his workout schedule!!',
                    icsRawText: sourceStr,
                    date: new Date(2019, 11, 24, 10, 33, 30, 0),
                    viewCount: 10,
                },
                {
                    id: 2,
                    name: this.props.location.username,
                    tag: 'School',
                    title: 'I love UofT! Checkout my 4th year schedule!!',
                    icsRawText: sourceStr,
                    date: new Date(2016, 11, 24, 10, 33, 30, 0),
                    viewCount: 1000000,
                },
            ],
        }
        if (this.props.location.uploadedContent) {
            this.state.posts.push(this.props.location.uploadedContent)
        }
    }

    updateSearchQuery = searchBarText => {
        this.setState({ searchQuery: searchBarText })
    }

    postPassesSearchQuery = post => {
        return (
            this.state.searchQuery === '' ||
            post.name
                .toLowerCase()
                .includes(this.state.searchQuery.toLowerCase()) ||
            post.title
                .toLowerCase()
                .includes(this.state.searchQuery.toLowerCase())
        )
    }

    handletagClick = (event, newVal) => {
        let newState = Object.assign({}, this.state)
        newState.tags[newVal] = !newState.tags[newVal]
        this.setState(newState)
    }

    handleSortClick = (event, newVal) => {
        let newState = Object.assign({}, this.state)
        newState.sortPosts[newVal] = !newState.sortPosts[newVal]
        if (newVal === 'Top') {
            newState.posts.sort((a, b) => b.viewCount - a.viewCount)
            newState.sortPosts[newVal] = true
            newState.sortPosts['New'] = false
        } else if (newVal === 'New') {
            newState.posts.sort((a, b) => b.date - a.date)
            newState.sortPosts[newVal] = true
            newState.sortPosts['Top'] = false
        }

        this.setState(newState)
    }

    checkSortClicked = () => {
        return this.state.sortPosts['Top'] || this.state.sortPosts['New']
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
                    searchCallback={this.updateSearchQuery}
                ></NavBar>
                <div className="content">
                    <div className="middle-content">
                        <div className="filter-toolbar">
                            <SortBox
                                sortPosts={this.state.sortPosts}
                                handleSortClick={this.handleSortClick}
                            />
                        </div>
                        {
                            //Will need API calls to get posts based on filter
                        }
                        <div className="posts">
                            {
                            // This will remap when a different tag is selected
                            // since the removal of a post doesn't actually modify a database
                            // the same state is re-usedthis.state.posts.map(
                                (post, i) =>
                                    this.checkSortClicked() && this.postPassesSearchQuery(post) && 
                                    (filterTags.includes(post.tag) ||
                                        filterTags.length === 0) && (
                                        <Post
                                            username={
                                                this.props.location.username
                                            }
                                            userType={
                                                this.props.location.userType
                                            }
                                            key={post.id}
                                            post={{
                                                name: this.props.location
                                                    .username,
                                                tag: post.tag,
                                                title: post.title,
                                                icsRawText: post.icsRawText,
                                                viewCount: post.viewCount,
                                                date: post.date,
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
                                        username: this.props.location.username,
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
