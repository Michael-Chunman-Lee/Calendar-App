import React from "react";
import "./Signup.css";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarContent } from "@material-ui/core";
import {signup} from "../../actions/user"
import Dropzone from "react-dropzone";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            errorMessage: "",
            uploadMessage: "Drag and drop a valid profile image",
            open: false,
            curFile: undefined
        }
        this.props.history.push("/signup")
    }

    handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    }
    onDrop = files => {
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = () => {
            this.setState({curFile: reader.result, uploadMessage: "File uploaded"})
        }
    }

    render() {
        const {app} = this.props

        return (
            <div className="signup">
                <form className="signupForm" onKeyPress={(event) => {if (event.key === "Enter") signup(this, app)}}>

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

                    <Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png">
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps({ id: "signUpiCalDrop" })}>
                                    <input {...getInputProps()} />
                                        <p>
                                            {this.state.uploadMessage}
                                        </p>
                                </div>
                            </section>
                        )}
                    </Dropzone>  
                    <br/>

                    <Button id="signupButton" onClick={() => signup(this, app)}> 
                        Done
                    </Button>
                    <br/><br/><br/><br/>
                    
                    <Link to={""} className="linkStyle">Already a user? Login here</Link> 
                    <br/>

                </form>
            </div>
        )
    }
}

export default withRouter(Signup);