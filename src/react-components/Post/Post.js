import React, { Component } from 'react'
import './Post.css'
import ScheduleCalendar from '../Calendar/Calendar'
import { MdClose } from 'react-icons/md'
import { withRouter } from 'react-router-dom'
class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: {
                name: this.props.post.name,
                tag: this.props.post.tag,
                title: this.props.post.title,
                icsRawText: this.props.post.icsRawText,
                viewCount: this.props.post.viewCount,
                date: this.props.post.date
            },
        }
    }

    onDeleteClick = () => {
        // This will be an API call that will remove the post from the
        // database
        this.setState({ post: undefined })
    }

    render() {
        return (
            (this.state.post && (
                <div className="post-container" onClick={this.props.onPostClick}>
                    {(this.props.username === this.state.post.name ||
                        this.props.userType === 'admin') && (
                        <span className="post-del-button">
                            <MdClose onClick={this.onDeleteClick}></MdClose>
                        </span>
                    )}
                    <div className="post-headers">
                        <span className="posted-by">
                            {this.state.post.name}
                        </span>
                        <span className="post-tag">{this.state.post.tag}</span>
                        <span className="post-tag">
                            View count: {this.state.post.viewCount}
                        </span>
                        <span className="post-tag">
                            Date posted: {this.state.post.date.toISOString().substring(0,10)}
                        </span>
                    </div>

                    <div className="post-title">
                        <h2>{this.state.post.title}</h2>
                    </div>
                    <span>
                        <ScheduleCalendar
                            icsRawText={this.state.post.icsRawText}
                        ></ScheduleCalendar>
                    </span>
                </div>
            )) || <div></div>
        )
    }
}

export default withRouter(Post)