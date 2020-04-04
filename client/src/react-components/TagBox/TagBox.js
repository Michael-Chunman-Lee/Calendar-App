import React, { Component } from 'react'
import './TagBox.css'
import ToggleButton from '@material-ui/lab/ToggleButton'

export default class TagBox extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className="tag-box">
                <div>
                    {' '}
                    <h1> Tags</h1>{' '}
                </div>
                <div className="tag-list">
                    {Object.keys(this.props.tags).map(k => (
                        <ToggleButton
                            className="tag-button"
                            key={k}
                            value={k}
                            selected={this.props.tags[k]}
                            onClick={this.props.handletagClick}
                        >
                            {k}
                        </ToggleButton>
                    ))}
                </div>
            </div>
        )
    }
}
