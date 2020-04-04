import React, { Component } from 'react'
import './Post.css'
import ScheduleCalendar from '../Calendar/Calendar'
import { MdClose } from 'react-icons/md'
import { withRouter } from 'react-router-dom'
import {incrementPost, deletePost} from "../../actions/post"

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: {
                _id: this.props.post._id,
                username: this.props.post.username,
                tag: this.props.post.tag,
                title: this.props.post.title,
                events: this.props.post.events,
                viewCount: this.props.post.viewCount,
                date: new Date(this.props.post.date),
            },
        }
    }

    // onDeleteClick = e => {
    //     // This will be an API call that will remove the post from the
    //     // database
    //     deletePost(this, this.props.app)
    //     this.setState({ post: undefined })
    //     e.stopPropagation()
    // }
    
    onPostClick = e => {
        if (!this.props.isSpecificView) {
            incrementPost(this.props.post._id)
            this.props.post.viewCount++;
            this.props.history.push({
                pathname: '../specificPost/' + this.props.post._id,
                post: this.props.post
            })
        } 
    }

    onCalendarClick = e => {
        e.stopPropagation()
    }

    redirectToUser = (username, e) => {
        e.stopPropagation()
        this.props.history.push({
            pathname: '../user/' + username,
        })
    }

    render() {
        const {app, post} = this.props
        return (
            (this.state.post && (
                <div className="post-container" onClick={this.onPostClick}>
                    {(app.state.currentUser === this.state.post.username ||
                        app.state.isAdmin) && (
                        <span className="post-del-button">
                            <MdClose onClick={(e) => this.props.onDeleteClick(e,this.state.post._id)}></MdClose>
                        </span>
                    )}
                    <div className="post-headers">
                        <span className="posted-by" onClick={this.redirectToUser.bind(this, this.state.post.username)}>
                            {this.state.post.username}
                        </span>
                        <span className="post-tag">{this.state.post.tag}</span>
                        <span className="post-tag">
                            View count: {this.state.post.viewCount}
                        </span>
                        <span className="post-tag">
                            Date posted:{' '}
                            {this.state.post.date
                                .toISOString()
                                .substring(0, 10)}
                        </span>
                    </div>

                    <div className="post-title">
                        <h2>{this.state.post.title}</h2>
                    </div>
                    <span onClick={this.onCalendarClick}>
                        <ScheduleCalendar
                            events={this.state.post.events}
                        ></ScheduleCalendar>
                    </span>
                </div>
            )) || <div></div>
        )
    }
}

export default withRouter(Post)
