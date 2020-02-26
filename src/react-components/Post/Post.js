import React, { Component } from 'react'
import './Post.css'
export default class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className="post-container">
                <div className="title">Title</div>
                <div className="calendar"> Calendar here </div>
            </div>
        )
    }
}
