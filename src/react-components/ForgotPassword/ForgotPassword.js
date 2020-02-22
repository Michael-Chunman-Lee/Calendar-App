import React from "react";
import "./ForgotPassword.css";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
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
                        type="text"
                        onChange={e => {
                            this.setState({oldPassword: e.target.value});
                        }}
                    />
                    <br/><br/>

                    <input 
                        className="forgotPasswordInput"
                        name="newPassword"
                        placeholder="New Password"
                        type="text"
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
                    
                    <Button id="forgotPasswordButton" onClick={e => { e.preventDefault();}}> 
                        Done
                    </Button>

                </form>
            </div>
        )
    }
}

export default ForgotPassword;