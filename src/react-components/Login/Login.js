import React from "react";
import "./Login.css";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarContent } from "@material-ui/core";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            open: false,
        }

    }

    onLoginClick = e => {
        this.setState({open: true});
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
            <div className="login">
                <form className="loginForm">

                    <br/>
                    <span className="loginTitle">Login</span>
                    <br/><br/>

                    <input 
                        className="loginInput"
                        name="Email"
                        placeholder="Email"
                        type="text"
                        onChange={e => {
                            this.setState({email: e.target.value});
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
                    
                    <Link to={"forgotPassword"} style={{textDecoration: 'none', color: 'black'}}>Forgot password?</Link> 
                    <br/><br/>

                    <Snackbar
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                    >
                        <SnackbarContent 
                            style={{backgroundColor: '#d62400'}} 
                            message="test" 
                            action={
                                <React.Fragment>
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                        }/>
                    </Snackbar>
                    
                    <Button id="loginButton" onClick={this.onLoginClick}> 
                        Done
                    </Button>
                </form>
            </div>
        )
    }
}

export default Login;