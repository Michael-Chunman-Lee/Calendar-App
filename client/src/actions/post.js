// A function to send a POST request with the post being uploaded
export const uploadPost = (uploadPostComp, app) => {
    const title = uploadPostComp.state.title
    const tag = uploadPostComp.state.tag
    const icsRawText = uploadPostComp.state.icsRawText
    
    const request = new Request("/posts", {
        method: "post",
        body: JSON.stringify({title: title, tag: tag, username: app.state.currentUser, icsRawText: icsRawText}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request).then(res => {
        if (res.status === 200) {
            return res.json()
        } else {
            uploadPostComp.setState({errorMessage: res.statusText, open: true})
        }
    }).then(json => {
        if (json !== undefined) {
            uploadPostComp.props.history.push("./home")
        }
    }).catch(error => {
        console.log(error)
    })
}

export const incrementPost = (postID) => {
    fetch(`/posts/increment/${postID}`,{
        method: "PATCH",
        headers: {'Accept': "application/json, text/plain, */*",
        "Content-Type": "application/json"}
    }).catch(error => {
        console.log(error)
    }) 
}

export const getSpecificPost = (postID) => {
    fetch('/posts/postID').then(res => {
        if (res.status === 200) {
            return res.json()
        }
    }).then (json => {
        if (json.post !== undefined) {
            //Not sure what is purpose of this
            return json.post
        }
    })
}

export const getPosts = (postsComp) => {
    const request = new Request("/posts", {
        method: "get",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
    })
    .then(json => {
        if (json.posts !== undefined) {
            postsComp.setState({ posts: json.posts.sort((a, b) => {return b.viewCount - a.viewCount})});
        }
    })
    .catch(error => {
        console.log(error);
    });
}

export const getPostsByName = (postsComp, username) => {
    const request = new Request(`/posts/username/${username}`, {
        method: "get",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
    })
    .then(json => {
        postsComp.setState({ posts: json.posts});
    })
    .catch(error => {
        console.log(error);
    });
}

export const deletePost = (id, postsComp, app) => {
    const request = new Request(`/posts/${id}`, {
        method: "delete",
        body: JSON.stringify({_id: app.state._id}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
    .then(res => {
        return getPosts(postsComp)
    })
    .catch(error => {
        console.log(error);
    });
}