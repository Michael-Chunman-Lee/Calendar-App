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

class UploadPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            tag: "Fitness"
        }
    }

    setTag = e => {
        this.setState({tag: e.target.value});
    }

    onDrop = files => {
        console.log(files);
    }
    
    onButtonClick = e => {
        this.props.history.push("./home")
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
                                    <p>Drag and drop your schedule here, or click to select your schedule</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        <br/><br/>

                        <Button onClick={this.onButtonClick}>Cancel</Button>
                        <Button onClick={this.onButtonClick} id="uploadButton">Post</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UploadPost);