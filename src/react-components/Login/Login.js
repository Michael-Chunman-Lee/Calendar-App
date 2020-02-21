import React from "react";
import "./Login.css";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
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

                    <span className="placeholderText">Forgot password?</span>
                    <br/><br/>
                    <button id="loginButton" onClick={e => { e.preventDefault();}}> 
                        Done
                    </button>

                </form>
            </div>
        )
    }
}

export default Login