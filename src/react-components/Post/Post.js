import React, { Component } from 'react'
import './Post.css'
import ScheduleCalendar from '../Calendar/Calendar'
export default class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className="post-container">
                <div className="post-headers">
                    <span className="posted-by">{this.props.post.name}</span>
                    <span className="post-tag">{this.props.post.tag}</span>
                </div>

                <div className="post-title">
                    <h2>{this.props.post.title}</h2>
                </div>
                <span>
                    <ScheduleCalendar
                        icsRawText={this.props.post.icsRawText}
                    ></ScheduleCalendar>
                </span>
            </div>
        )
    }
}
