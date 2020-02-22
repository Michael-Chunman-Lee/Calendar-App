import React from "react";
import "./Login.css";
import {Link} from "react-router-dom";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
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
                    
                    <Link to={"login"} style={{textDecoration: 'none', color: 'black'}}>Forgot password?</Link> 
                    <br/><br/>
                    <button id="loginButton" onClick={e => { e.preventDefault();}}> 
                        Done
                    </button>

                </form>
            </div>
        )
    }
}

export default Login;