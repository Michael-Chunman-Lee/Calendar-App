import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link, withRouter } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import './NavBar.css'

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            serachQuery: '',
        }
    }

    onProfileClick = e => {
        e.preventDefault()
        //Redirect to page
    }
    onHomeClick = e => {
        e.preventDefault()
        this.props.history.push('./home')
    }

    updateSearchQuery = e => {
        this.setState({
            serachQuery: e.target.value,
        })
    }

    render() {
        return (
            <div className="nav">
                <span className="title">Title</span>
                <div className="search">
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
                </div>
                <span className="nav-icons">
                    <IconButton onClick={this.onProfileClick} color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <IconButton onClick={this.onHomeClick} color="inherit">
                        <HomeIcon />
                    </IconButton>
                </span>
            </div>
        )
    }
}
export default withRouter(NavBar)
