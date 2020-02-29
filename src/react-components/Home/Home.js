import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import './Home.css'
import Post from '../Post/Post'
import ProfileBox from '../ProfileBox/ProfileBox'
import FlairBox from '../FlairBox/FlairBox'
import { withRouter } from 'react-router-dom'

class Home extends Component {
    constructor(props) {
        super(props)

        //This will represent the currently signed in user data
        this.state = {
            flairs: {
                Fitness: false,
                Gaming: false,
                School: false,
                Food: false,
            },
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
            <div className="home-main-div">
                <NavBar name={this.state.name}></NavBar>
                <div className="home-content">
                    <div className="home-middle-content">
                        <div className="home-filter-toolbar">
                            <span> Top </span>
                            <span> New </span>
                        </div>
                        <div className="home-posts">
                            {this.state.posts.map(
                                (post, i) =>
                                    (filterTags.includes(post.tag) ||
                                        filterTags.length === 0) && (
                                        <Post key={i} post={post}></Post>
                                    )
                            )}
                        </div>
                    </div>
                    <div className="home-right-content">
                        <FlairBox
                            flairs={this.state.flairs}
                            handleFlairClick={this.handleFlairClick}
                        ></FlairBox>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home)
