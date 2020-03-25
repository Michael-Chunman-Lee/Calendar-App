export const readCookie = (app) => {
    const url = "/users/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser, isAdmin: json.isAdmin });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a POST request with the user signing up
export const signup = (signupComp, app) => {
    const request = new Request("/users", {
        method: "post",
        body: JSON.stringify(signupComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request).then(res => {
        if (res.status === 200) {
            return res.json()
        } else {
            signupComp.setState({errorMessage: res.statusText, open: true})
        }
    }).then(json => {
        if (json !== undefined) {
            signupComp.props.history.push("/login")
        }
    }).catch(error => {
        console.log(error)
    })
}

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/users/login", {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                loginComp.setState({open: true})
            }
        })
        .then(json => {
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser, isAdmin: json.isAdmin });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = "/users/logout";

    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
                message: { type: "", body: "" },
                isAdmin: false
            });
        })
        .catch(error => {
            console.log(error);
        });
};