import React from "react";
import "./ForgotPassword.css";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarContent } from "@material-ui/core";
import {newPassword} from "../../actions/user"

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            open: false,
            errorMessage: ""
        }
    }
    
    validateForm = () =>{
        //Dummy data below will be replaced with calls to a server-side database api
         if (this.state.oldPassword === "" || this.state.newPassword === "" || this.state.confirmPassword === "" || this.state.username === "") {
            this.setState({errorMessage: "One or more of the fields are empty!", open: true});
        } else if (this.state.newPassword !== this.state.confirmPassword) {
            this.setState({errorMessage: "Passwords do not match!", open: true});
        } else if (this.state.newPassword === this.state.confirmPassword) {
            this.props.history.push("/");
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
        const {app} = this.props

        return (
            <div className="forgotPassword">
                <form className="forgotPasswordForm" onKeyPress={(event) => {if (event.key === "Enter") newPassword(this, app)}}>

                    <br/>
                    <span className="forgotPasswordTitle">Reset Password</span>
                    <br/><br/>

                    <input 
                        className="forgotPasswordInput"
                        name="Username"
                        placeholder="Username"
                        type="text"
                        onChange={e => {
                            this.setState({username: e.target.value});
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
                    
                    <Link to={""} className="linkStyle">Return to login</Link> 
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

                    <Button id="forgotPasswordButton" onClick={() => newPassword(this, app)}> 
                        Done
                    </Button>

                </form>
            </div>
        )
    }
}

export default withRouter(ForgotPassword);