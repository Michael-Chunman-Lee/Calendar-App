import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import { withRouter } from 'react-router-dom'
import './Profile.css'
import Post from '../Post/Post'
import ProfileBox from '../ProfileBox/ProfileBox'
import TagBox from '../TagBox/TagBox'
import Button from '@material-ui/core/Button'
import SortBox from '../SortBox/SortBox'
import {getPostsByName, deletePost } from '../../actions/post'
import Dropzone from "react-dropzone";
import { getImage, newImage } from '../../actions/image'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchQuery: '',
            tags: {
                Fitness: false,
                Gaming: false,
                School: false,
                Work: false
            },
            sortPosts: {
                Top: true,
                New: false,
            },
            //Api call will need to be made to retrieve this data from a database
            posts: [],
            image_url: "",
            image_id: "",
            curFile: undefined,
            uploadMessage: "Drag or drop a new profile picture"
        }
        // if (this.props.location.uploadedContent) {
        //     this.state.posts.push(this.props.location.uploadedContent)
        // }
        //this.props.history.push("/user/" + this.props.profileName)
        if (this.props.profileName) {
            this.name = this.props.profileName
        } else {
            this.name = this.props.app.state.currentUser
        }
        // getPosts(this)
        // getPostsByName(this, this.name)
        
    }

    componentDidMount(){
        getPostsByName(this, this.name)
        getImage(this, this.name)
    }

    onDeleteClick = (e, id) => {
        deletePost(id, this,this.props.app)
        e.stopPropagation()
    }

    componentDidUpdate(prevProps, prevState){
        let current_user = window.location.href.split("/")[4]
        if (this.name !== current_user) {
            this.name = current_user
            getPostsByName(this, this.name)
            getImage(this, this.name)
        }
    }

    updateSearchQuery = searchBarText => {
        this.setState({ searchQuery: searchBarText })
    }

    onDrop = files => {
        if (files[0] !== undefined) {
            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = () => {
                this.setState({curFile: reader.result, uploadMessage: "File uploaded"})
            }
        }
    }

    postPassesSearchQuery = post => {
        return (
            this.state.searchQuery === '' ||
            post.username
                .toLowerCase()
                .includes(this.state.searchQuery.toLowerCase()) ||
            post.title
                .toLowerCase()
                .includes(this.state.searchQuery.toLowerCase())
        )
    }

    handletagClick = (event, newVal) => {
        let newState = Object.assign({}, this.state)
        newState.tags[newVal] = !newState.tags[newVal]
        this.setState(newState)
    }

    handleSortClick = (event, newVal) => {
        if (newVal === 'Top') {
            this.setState(prevState => ({posts: prevState.posts.sort((a, b) => {return b.viewCount - a.viewCount}), sortPosts: {"Top": true, "New": false}}))
        } else if (newVal === 'New') {
            this.setState(prevState => ({posts: prevState.posts.sort((a,b) => {return new Date(b.date) - new Date(a.date)}), sortPosts: {"New": true, "Top": false}}))
        }
    }

    checkSortClicked = () => {
        return this.state.sortPosts['Top'] || this.state.sortPosts['New']
    }

    render() {
        let filterTags = []
        Object.keys(this.state.tags).map(
            k => this.state.tags[k] && filterTags.push(k)
        )
        const {app, history, profileName} = this.props

        return (
            <div className="main-div">
                <NavBar
                    app={app}
                    history={history}
                    searchCallback={this.updateSearchQuery}
                ></NavBar>
                <div className="content">
                    <div className="middle-content">
                        <div className="filter-toolbar">
                            <SortBox
                                sortPosts={this.state.sortPosts}
                                handleSortClick={this.handleSortClick}
                            />
                        </div>
                        {
                            //Will need API calls to get posts based on filter
                        }
                        <div className="posts">
                            {// This will remap when a different tag is selected
                            // since the removal of a post doesn't actually modify a database
                            // the same state is re-used
                            this.state.posts.map(
                                (post, i) =>
                                    this.checkSortClicked() &&
                                    this.postPassesSearchQuery(post) &&
                                    (filterTags.includes(post.tag) ||
                                        filterTags.length === 0) && (
                                        <Post
                                            app={app}
                                            key={post._id}
                                            history={history}
                                            onDeleteClick={this.onDeleteClick}
                                            post={post}
                                            isSpecificView={false}
                                        ></Post>
                                    )
                            )}
                        </div>
                    </div>
                    {
                        //Api call to get profile info (if not current user profile)
                    }
                    <div className="right-content">
                        {app.state.currentUser === this.name && (
                            <Button
                                id="createScheduleButton"
                                onClick={e => {
                                    this.props.history.push('../uploadPost')
                                }}
                            >
                                Create a new schedule
                            </Button>
                            
                            
                        )}
                        {app.state.currentUser === this.name && (
                            <div className="upload-pic-profile">
                                <Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png">
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps({ id: "profileiCalDrop" })}>
                                                <input {...getInputProps()} />
                                                    <p>
                                                        {this.state.uploadMessage}
                                                    </p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </div>
                        )}
                        {app.state.currentUser === this.name && (
                            <Button
                                id="uploadPicButton"
                                onClick={() => newImage(this, this.name)}
                            >
                                Change profile pic
                            </Button>
                        )}

                        <TagBox
                            tags={this.state.tags}
                            handletagClick={this.handletagClick}
                        ></TagBox>
                        <ProfileBox image_url={this.state.image_url} name={this.name}></ProfileBox>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile)
