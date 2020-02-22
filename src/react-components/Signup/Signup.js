import React from "react";
import "./Signup.css";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    render() {
        document.body.style = "background: lightskyblue;";

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
                            this.setState({password: e.target.value});
                        }}
                    />
                    <br/><br/>

                    <Button id="signupButton" onClick={e => { e.preventDefault();}}> 
                        Done
                    </Button>
                    <br/><br/><br/><br/>
                    
                    <Link to={"login"} style={{textDecoration: 'none', color: 'black'}}>Already a user? Login here</Link> 
                    <br/>

                </form>
            </div>
        )
    }
}

export default Signup;