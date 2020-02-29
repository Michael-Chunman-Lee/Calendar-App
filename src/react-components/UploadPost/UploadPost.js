import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import {withRouter} from "react-router-dom";
import './UploadPost.css'
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarContent } from "@material-ui/core";

class UploadPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            tag: "Fitness",
            fileName: "Drag and drop your schedule here, or click to select your schedule",
            icsRawText: null,
            open: false
        }
    }

    setTag = e => {
        this.setState({tag: e.target.value});
    }

    onHandleSnackBarClose = (e, reason) => {
        if (reason === 'clickaway') {
            return
        }
        this.setState({open: false});
    }

    onDrop = files => {
        const reader = new FileReader();

        //When the file is ready parse the contents 
        reader.onload = function(e) {
            //Plain text of the ics file
            this.setState({icsRawText: e.target.result});
        }.bind(this);

        //Read the ics file in as plain text
        reader.readAsText(files[0]);
        this.setState({fileName: "Are you sure you want to post " + files[0].name + "?"})
    }
    
    onCloseClick = e => {
        this.props.history.push("./home")
    }

    onPostClick = e => {
        if (this.state.icsRawText === null) {
            this.setState({open: true});
            return
        }
        
        //In your home page, the uploadedContent will be available in this.props.location.uploadedContent
        //If the this.props.location.uploadedContent is undefined, then this means that the user has not actually
        //uploaded anything (i.e. redirected from login or clicked cancel on upload post page, etc...)
        this.props.history.push({
            pathname: "./home",
            uploadedContent: {
                title: this.state.title,
                icsRawText: this.state.icsRawText,
                tag: this.state.tag
            }
        })
    }

    render() {
        return (
            <div className="upload-div">
                <NavBar name={this.state.name}></NavBar>
                <div className="upload-content">

                    <div className="titleBar">
                        <span className="text"><strong>Create a post</strong></span>
                    </div>
                    <br/>
                    <div className="tagBar">
                        <span className="text"><strong>Tag:</strong></span>
                        <FormControl required className="tagForm"  >
                            <Select onChange={this.setTag} value={this.state.tag}>
                                <MenuItem value="Fitness">Fitness</MenuItem>
                                <MenuItem value="School">School</MenuItem>
                                <MenuItem value="Gaming">Gaming</MenuItem>
                                <MenuItem value="Food">Food</MenuItem>
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                    </div>
                    <br/>
                    <div className="postUpload">
                        <TextField inputProps={{maxLength: 100}} className="titleField" label="Title (max 100 characters)"></TextField>
                        <br/><br/><br/>

                        <Dropzone onDrop={this.onDrop} accept=".ICS">
                            {({getRootProps, getInputProps}) => (
                                <section>
                                    <div {...getRootProps({className: 'iCalDrop'})}>
                                    <input {...getInputProps()} />
                                    <p>{this.state.fileName} <br/> (Only accepted file extension is .ics)</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        <br/><br/>

                        <Button onClick={this.onCloseClick}>Cancel</Button>
                        <Button onClick={this.onPostClick} id="uploadButton">Post</Button>
                    </div>

                    <Snackbar
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                        open={this.state.open}
                        autoHideDuration={3000}
                        onClose={this.handleClose}
                    >
                        <SnackbarContent 
                            id="snackBarStyle"
                            message="You have not yet uploaded a schedule!"
                            action={
                                <React.Fragment>
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.onHandleSnackBarClose}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                        }/>
                    </Snackbar>

                </div>
            </div>
        )
    }
}

export default withRouter(UploadPost);