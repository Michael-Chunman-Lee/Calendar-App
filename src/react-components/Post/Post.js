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
                <div className="post-title">Title</div>
                <span>
                    <ScheduleCalendar></ScheduleCalendar>
                </span>
            </div>
        )
    }
}
