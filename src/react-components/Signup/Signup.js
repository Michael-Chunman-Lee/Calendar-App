import React from "react";
import "./Signup.css";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarContent } from "@material-ui/core";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            errorMessage: "",
            open: false
        }
    }

    validateSignup = () =>{
        //Dummy data below will be replaced with calls to a server-side database api
         if (this.state.password === "" || this.state.confirmPassword === "" || this.state.username === "" || this.state.email === "") {
            this.setState({errorMessage: "One or more of the fields are empty!", open: true});
        } else if (this.state.username === "user" || this.state.username === "admin") {
            this.setState({errorMessage: "Username already taken!", open: true});
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({errorMessage: "Passwords do not match!", open: true});
        } else if (this.state.password === this.state.confirmPassword) {
            this.props.history.push("./login")
        }
    }

    onSignupClick = e => {
        e.preventDefault();
        this.validateSignup();
    }

    handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    }

    render() {

        return (
            <div className="signup">
                <form className="signupForm">

                    <br/>
                    <span className="signupTitle">Sign Up</span>
                    <br/><br/>

                    <input 
                        className="signupInput"
                        name="Email"
                        placeholder="Email"
                        type="text"
                        onChange={e => {
                            this.setState({email: e.target.value});
                        }}
                    />
                    <br/> <br/>
                    
                    <input 
                        className="signupInput"
                        name="Username"
                        placeholder="Username"
                        type="text"
                        onChange={e => {
                            this.setState({username: e.target.value});
                        }}
                    />
                    <br/><br/>

                    <input 
                        className="signupInput"
                        name="Password"
                        placeholder="Password"
                        type="password"
                        onChange={e => {
                            this.setState({password: e.target.value});
                        }}
                    />
                    <br/><br/>

                    <input 
                        className="signupInput"
                        name="ConfirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        onChange={e => {
                            this.setState({confirmPassword: e.target.value});
                        }}
                    />
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
                            message={this.state.errorMessage} 
                            action={
                                <React.Fragment>
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                        }/>
                    </Snackbar>
                    
                    <Button id="signupButton" onClick={this.onSignupClick}> 
                        Done
                    </Button>
                    <br/><br/><br/><br/>
                    
                    <Link to={"login"} className="linkStyle">Already a user? Login here</Link> 
                    <br/>

                </form>
            </div>
        )
    }
}

export default withRouter(Signup);