import React, { Component } from 'react'
import './FlairBox.css'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

export default class FlairBox extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className="flair-box">
                <div>
                    {' '}
                    <h1> Flairs</h1>{' '}
                </div>
                <div className="flair-list">
                    {Object.keys(this.props.flairs).map(k => (
                        <ToggleButton
                            className="flair-button"
                            key={k}
                            value={k}
                            selected={this.props.flairs[k]}
                            onClick={this.props.handleFlairClick}
                        >
                            {k}
                        </ToggleButton>
                    ))}
                </div>
            </div>
        )
    }
}
