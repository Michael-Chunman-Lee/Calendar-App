import React from "react";
import "./Login.css";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarContent } from "@material-ui/core";
import {login} from "../../actions/user"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            open: false,
        }
        this.props.history.push("/login")

    }

    validateLogin = () =>{
        //Dummy data below will be replaced with calls to a server-side database api
        if (this.state.username === "admin") {
            if (this.state.password === "admin") {
                //Send user to admin dashboard
                this.props.history.push({
                    pathname: "./admindashboard",
                    userType: "admin",
                    username: "admin"
                })
            } 

        } else if (this.state.username === "user") {
            if (this.state.password === "user") {
                //Send user to user dashboard

                this.props.history.push({
                    pathname: "./home",
                    userType: "user",
                    username: "user"
                })
            }
        } else {
            this.setState({open: true});
        }
    }

    onLoginClick = e => {
        e.preventDefault();
        this.validateLogin();
    }

    handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    }

    render() {
        const {app} = this.props

        return (
            <div className="login">
                <form className="loginForm">

                    <br/>
                    <span className="loginTitle">Login</span>
                    <br/><br/>

                    <input 
                        className="loginInput"
                        name="username"
                        placeholder="Username"
                        type="text"
                        onChange={e => {
                            this.setState({username: e.target.value});
                        }}
                    />
                    <br/> <br/>

                    <input 
                        className="loginInput"
                        name="Password"
                        placeholder="Password"
                        type="password"
                        onChange={e => {
                            this.setState({password: e.target.value});
                        }}
                    />
                    <br/>
                    
                    <Link to={"forgotPassword"} className="linkStyle">Forgot password?</Link> 
                    <br/><br/>

                    <Snackbar
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                        open={this.state.open}
                        autoHideDuration={3000}
                        onClose={this.handleClose}
                    >
                        <SnackbarContent 
                            id="snackBarStyle"
                            message="Invalid password or username!" 
                            action={
                                <React.Fragment>
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                        }/>
                    </Snackbar>
                    
                    <Button id="loginButton" onClick={() => login(this, app)}> 
                        Done
                    </Button>
                    <br/><br/><br/>
                    
                    <Link to={""} className="linkStyle">Not yet a user? Sign up here</Link> 
                    <br/>

                </form>
            </div>
        )
    }
}

export default withRouter(Login);