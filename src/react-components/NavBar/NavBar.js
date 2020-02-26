import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link, withRouter } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    onProfileClick = e => {
        e.preventDefault()
        //Redirect to page
    }
    onHomeClick = e => {
        e.preventDefault()
        this.props.history.push('./home')
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <span>Title</span>
                        <IconButton
                            onClick={this.onProfileClick}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <IconButton onClick={this.onHomeClick} color="inherit">
                            <HomeIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default withRouter(NavBar)
