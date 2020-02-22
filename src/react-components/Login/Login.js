import React from "react";
import "./Login.css";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            anchorEl: null,
            open: false
        }
    }

    flipOpen = () => {
        this.setState({...this.state, open: !this.state.open});
    }

    onLoginClick = e => {
        console.log(e.currentTarget);
        this.state.anchorEl ? this.setState({anchorEl: null}) : this.setState({anchorEl: e.currentTarget});
        this.flipOpen();
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
                    
                    <Button id="loginButton" onClick={this.onLoginClick}> 
                        Done
                    </Button>
                </form>
            </div>
        )
    }
}

export default Login;