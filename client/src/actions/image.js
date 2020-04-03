export const getImage = (profileComp, username)  => {
    fetch(`/images/${username}`).then(res => {
        if (res.status === 200) {
            return res.json()
        }
    }).then(json => {
        if (json) {
            profileComp.setState({image_url: json.image_url, image_id: json.image_id})
        }
    })
}

export const newImage = (profileComp, username) => {
    const image_id = profileComp.state.image_id
    const curFile = profileComp.state.curFile
    if (image_id === "" || curFile === undefined) {
        return;
    }

    const bodyObj = {
        curFile: curFile,
        username: username
    }

    fetch(`/images/${image_id}`,{
        method: "PATCH",
        body: JSON.stringify(bodyObj),
        headers: {'Accept': "application/json, text/plain, */*",
        "Content-Type": "application/json"}
    }).then(res => {
        if (res.status === 200) {
            return res.json()
        } else {
            profileComp.setState({uploadMessage: "Upload failed"})
        }
    }).then(json => {
        if (json) {
            profileComp.setState({image_url: json.image_url, image_id: json.image_id, uploadMessage: "Drag or drop a new profile picture"})
        }
    })
}