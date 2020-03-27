import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import './Home.css'
import Post from '../Post/Post'
import TagBox from '../TagBox/TagBox'
import { withRouter } from 'react-router-dom'
import { sourceStr } from '../../data/coursesCalendarString'
import SortBox from '../SortBox/SortBox'
import {getPosts, deletePost } from '../../actions/post'
class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchQuery: '',
            tags: {
                Fitness: false,
                Gaming: false,
                School: false,
                Food: false,
            },
            sortPosts: {
                Top: true,
                New: false,
            },
            //An Api call will be made in the future to retrieve this data from a database
            posts: [],
        }
        if (this.props.location.uploadedContent) {
            this.state.posts.push(this.props.location.uploadedContent)
        }
        this.props.history.push("/home")

        
    }

    componentDidMount(){
        getPosts(this)
    }


    onDeleteClick = (e, id) => {
        deletePost(id, this,this.props.app)
        e.stopPropagation()
    }
    

    updateSearchQuery = searchBarText => {
        this.setState({ searchQuery: searchBarText })
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
        let newState = Object.assign({}, this.state)
        newState.sortPosts[newVal] = !newState.sortPosts[newVal]
        if (newVal === 'Top') {
            newState.posts.sort((a, b) => b.viewCount - a.viewCount)
            newState.sortPosts[newVal] = true
            newState.sortPosts['New'] = false
        } else if (newVal === 'New') {
            newState.posts.sort((a, b) => b.date - a.date)
            newState.sortPosts[newVal] = true
            newState.sortPosts['Top'] = false
        }

        this.setState(newState)
    }

    checkSortClicked = () => {
        return this.state.sortPosts['Top'] || this.state.sortPosts['New']
    }

    render() {
        const { app, history } = this.props;
        let filterTags = []

        Object.keys(this.state.tags).map(
            k => this.state.tags[k] && filterTags.push(k)
        )


        return (
            <div className="home-main-div">
                <NavBar
                    app={app}
                    history={history}
                    searchCallback={this.updateSearchQuery}
                ></NavBar>
                <div className="home-content">
                    <div className="home-middle-content">
                        <div className="home-filter-toolbar">
                            <SortBox
                                sortPosts={this.state.sortPosts}
                                handleSortClick={this.handleSortClick}
                            />
                        </div>
                        <div className="home-posts">
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
                                            history={history}
                                            key={post._id}
                                            post={post}
                                            onDeleteClick={this.onDeleteClick}
                                        ></Post>
                                    )
                            )}
                        </div>
                    </div>
                    <div className="home-right-content">
                        <TagBox
                            tags={this.state.tags}
                            handletagClick={this.handletagClick}
                        ></TagBox>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home)
