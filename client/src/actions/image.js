export const getImage = (profileComp, username)  => {
    fetch(`/images/${username}`).then(res => {
        if (res.status === 200) {
            return res.json()
        }
    }).then(json => {
        if (json) {
            profileComp.setState({image_url: json.image_url})
        }
    })
}