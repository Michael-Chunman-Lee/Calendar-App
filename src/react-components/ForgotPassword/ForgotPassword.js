import React from "react";
import "./ForgotPassword.css";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarContent } from "@material-ui/core";

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            open: false,
            errorMessage: ""
        }
    }
    
    validateForm = () =>{
        //Dummy data below will be replaced with calls to a server-side database api
         if (this.state.oldPassword === "" || this.state.newPassword === "" || this.state.confirmPassword === "" || this.state.username === "" || this.state.email === "") {
            this.setState({errorMessage: "One or more of the fields are empty!", open: true});
        } else if (this.state.newPassword !== this.state.confirmPassword) {
            this.setState({errorMessage: "Passwords do not match!", open: true});
        } else if (this.state.newPassword === this.state.confirmPassword) {
            this.props.history.push("./login");
        }
    }

    onButtonClick= e => {
        e.preventDefault();
        this.validateForm();
    }

    handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    }

    render() {
        document.body.style = "background: lightskyblue;";

        return (
            <div className="forgotPassword">
                <form className="forgotPasswordForm">

                    <br/>
                    <span className="forgotPasswordTitle">Reset Password</span>
                    <br/><br/>

                    <input 
                        className="forgotPasswordInput"
                        name="Email"
                        placeholder="Email"
                        type="text"
                        onChange={e => {
                            this.setState({email: e.target.value});
                        }}
                    />
                    <br/><br/>

                    <input 
                        className="forgotPasswordInput"
                        name="oldPassword"
                        placeholder="Old Password"
                        type="password"
                        onChange={e => {
                            this.setState({oldPassword: e.target.value});
                        }}
                    />
                    <br/><br/>

                    <input 
                        className="forgotPasswordInput"
                        name="newPassword"
                        placeholder="New Password"
                        type="password"
                        onChange={e => {
                            this.setState({newPassword: e.target.value});
                        }}
                    />
                    <br/><br/>

                    <input 
                        className="forgotPasswordInput"
                        name="ConfirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        onChange={e => {
                            this.setState({confirmPassword: e.target.value});
                        }}
                    />
                    <br/>
                    
                    <Link to={"login"} style={{textDecoration: 'none', color: 'black'}}>Return to login</Link> 
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
                            style={{backgroundColor: '#d62400'}} 
                            message={this.state.errorMessage} 
                            action={
                                <React.Fragment>
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                        }/>
                    </Snackbar>

                    <Button id="forgotPasswordButton" onClick={this.onButtonClick}> 
                        Done
                    </Button>

                </form>
            </div>
        )
    }
}

export default withRouter(ForgotPassword);