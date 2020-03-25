import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { withRouter } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import './NavBar.css'

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
            app: this.props.app
        })
    }
    onHomeClick = e => {
        e.preventDefault()
        this.props.history.push({
            pathname: '/home',
            app: this.props.app
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
            app: this.props.app
        })
    }

    render() {
        const { app, searchCallback, noSearchBar } = this.props
        return (
            <div className="nav">
                <span className="title">Title</span>
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
                        <span onClick={this.onAdminClick}>Admin</span>
                    )}
                    {!app.state.isAdmin && (
                        <IconButton
                            onClick={this.onProfileClick}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    )}
                    <IconButton onClick={this.onHomeClick} color="inherit">
                        <HomeIcon />
                    </IconButton>
                </span>
            </div>
        )
    }
}
export default withRouter(NavBar)
