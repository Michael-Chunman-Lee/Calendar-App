export const addImage(file, signupComp) {
    const request = new Request("/images", {
        method: "post",
        body: {file: file}
    })
    
    fetch(request).then(function (res) {
        if (res.status === 200) {
            
        }
    })
}