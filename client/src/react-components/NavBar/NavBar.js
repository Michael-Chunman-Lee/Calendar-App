import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { withRouter } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import SecurityIcon from '@material-ui/icons/Security'
import './NavBar.css'
import {logout} from "../../actions/user"

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchQuery: '',
        }
    }

    onProfileClick = e => {
        e.preventDefault()
        //Redirect to page
        this.props.history.push({
            pathname: '/user/' + this.props.app.state.currentUser,
        })
    }
    onHomeClick = e => {
        e.preventDefault()
        this.props.history.push({
            pathname: '/home',
        })
    }

    updateSearchQuery = e => {
        if (this.props.searchCallback){
            this.props.searchCallback(e.target.value)
        }
        this.setState({
            searchQuery: e.target.value,
        })
    }
    onAdminClick = e => {
        e.preventDefault()
        this.props.history.push({
            pathname: '/admindashboard',
        })
    }

    render() {
        const { app, searchCallback, noSearchBar } = this.props
        return (
            <div className="nav">
                <span className="title">Calendar App</span>
                {(!noSearchBar) && (<div className="search">
                    <div className="search-icon">
                        <IconButton>
                            <SearchIcon></SearchIcon>
                        </IconButton>
                    </div>
                    <InputBase
                        placeholder="Search…"
                        onChange={this.updateSearchQuery}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>)}
                <span className="nav-icons">
                    {app.state.isAdmin && (
                        <IconButton onClick={this.onAdminClick} color="inherit">
                            <SecurityIcon></SecurityIcon>
                        </IconButton>
                    )}
                    <IconButton
                        onClick={this.onProfileClick}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <IconButton onClick={this.onHomeClick} color="inherit">
                        <HomeIcon />
                    </IconButton>
                    <IconButton onClick={() => logout(app)} color="inherit">
                        <MeetingRoomIcon/>
                    </IconButton>
                </span>
            </div>
        )
    }
}
export default withRouter(NavBar)
