// A function to send a POST request with the post being uploaded
export const uploadPost = (uploadPostComp, app) => {
    const title = uploadPostComp.state.title
    const tag = uploadPostComp.state.tag
    const icsRawText = uploadPostComp.state.icsRawText
    
    const request = new Request("/posts", {
        method: "post",
        body: JSON.stringify({title: title, tag: tag, user: app.state.currentUser, icsRawText: icsRawText}),
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
            uploadPostComp.props.history.push("/")
        }
    }).catch(error => {
        console.log(error)
    })
}