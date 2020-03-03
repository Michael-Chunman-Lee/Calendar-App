import React, { Component } from 'react'
import './SortBox.css'
import ToggleButton from '@material-ui/lab/ToggleButton'

export default class SortBox extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className="sort-box">
                <div className="sort-list">
                        <ToggleButton
                            className="sort-button"
                            key="Top"
                            value="Top"
                            selected={this.props.sortPosts["Top"]}
                            onClick={this.props.handleSortClick}
                        >
                            Top
                        </ToggleButton>
                        <ToggleButton
                            className="sort-button"
                            key="New"
                            value="New"
                            selected={this.props.sortPosts["New"]}
                            onClick={this.props.handleSortClick}
                        >
                            New
                        </ToggleButton>
                </div>
            </div>
        )
    }
}
