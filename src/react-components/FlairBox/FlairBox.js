import React, { Component } from 'react'
import './FlairBox.css'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

export default class FlairBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            flairs: { Fitness: true, Gaming: false, School: true, Food: false },
        }
    }

    handleFlairClick = (event, newVal) => {
        let newState = Object.assign({}, this.state)
        newState.flairs[newVal] = !newState.flairs[newVal]
        this.setState(newState)
    }

    render() {
        return (
            <div className="flair-box">
                <div>
                    {' '}
                    <h1> Flairs</h1>{' '}
                </div>
                <div className="flair-list">
                    {Object.keys(this.state.flairs).map(k => (
                        <ToggleButton
                            className="flair-button"
                            key={k}
                            value={k}
                            selected={this.state.flairs[k]}
                            onClick={this.handleFlairClick}
                        >
                            {k}
                        </ToggleButton>
                    ))}
                </div>
            </div>
        )
    }
}
