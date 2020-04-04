import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import './SpecificPost.css'
import Post from '../Post/Post'

import RatingForm from './RatingForm'
import OldRating from './OldRating'

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';
import { sourceStr } from '../../data/coursesCalendarString'
import { withRouter } from 'react-router-dom'
import { deletePost } from '../../actions/post'
class SpecificPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // This information will eventually be obtained from the backend
            // In the meantime, we will use mock objects
            post: {},

            criteriaLabels: ["Workload", "Interest", "Timing"],

            oldRatings: [
                {
                    username: "TheLegend76",
                    criteriaLabels: ["Workload", "Interest", "Timing"],
                    criteriaRatings: [1, 5, 4],
                    additionalComment: "Looks like some good stuff"
                }
            ],
            isCalendarLoading: true,
            isRatingsLoading: true
        }
    }

    getCommentsData() {
        fetch("/posts/id/" + this.props.postId)
        .then(res => {
            return res.json()
        })
        .then(json => {
            if (json !== undefined) {
                this.setState({ oldRatings: json.ratings, isRatingsLoading: false });
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    getCalendarData() {
        if (this.props.location.post) {
            this.setState({ post: this.props.location.post , isCalendarLoading: false})
        } else {

            fetch("/posts/id/" + this.props.postId)
            .then(res => {
                return res.json()
            })
            .then(json => {
                if (json !== undefined) {
                    this.setState({ post: json, isCalendarLoading: false });
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    componentDidMount() {
        this.getCalendarData();
        this.getCommentsData();
    }

    removeRating(rating) {
        return fetch('/posts/delete-rating/' + this.state.post._id, {
            method: 'delete',
            headers: {'Accept': "application/json, text/plain, */*",
                "Content-Type": "application/json"},
            body: JSON.stringify({ userid: this.props.app.state.userID , rating: rating})
        })
        .then(response => this.componentDidMount())
        .catch(error => {
            console.log(error);
        });
    }

    onPostDeleteClick = (e, id) => {
        deletePost(id, this,this.props.app)
        e.stopPropagation()
        this.props.history.push("/home")
    }

    submithandler() {

   

        let newUsername = this.props.app.state.currentUser
        let newcriteriaLabels = this.state.criteriaLabels;
        let newcriteriaRatings = []
        for (let i = 0; i < this.state.criteriaLabels.length; i++) {
            let label = this.state.criteriaLabels[i];
            newcriteriaRatings.push(parseInt(document.getElementsByClassName(label + i)[0].innerText))
        }
        let newAddtionalReview = document.getElementsByClassName("inputFormAddtionalReview")[0].value;


        let newRating = {
            username: newUsername,
            criteriaLabels: newcriteriaLabels,
            criteriaRatings: newcriteriaRatings,
            additionalComment: newAddtionalReview
        }


        return fetch('/posts/add-rating/' + this.state.post._id, {
            method: 'post',
            headers: {'Accept': "application/json, text/plain, */*",
                "Content-Type": "application/json"},
            body: JSON.stringify(newRating)
        })
        .then(response => this.componentDidMount())
        .catch(error => {
            console.log(error);
        });

    }

    onPostClick = (e) => {
        return;
    }
    
    createDeletePostButton(oldRating) {
        if (this.props.app.state.isAdmin || this.props.app.state.currentUser == oldRating.username) {
            return <IconButton onClick={() => this.removeRating(oldRating)} color="inherit"                        className="removeRatingButton">
                                            <CloseIcon />
                                        </IconButton>;
        } else {
            return <div></div>
        }
    }
    
    checkIfRated() {
        console.log(this.state.oldRatings.filter(obj => obj.username == this.props.app.state.currentUser).length > 0)
        return this.state.oldRatings.filter(obj => obj.username == this.props.app.state.currentUser).length > 0;
    }

    renderAfterDisplay() {
        if (!this.state.isCalendarLoading && !this.state.isRatingsLoading) {
            return (
                <div className="main-div">
                    <NavBar name={this.state.name} app={this.props.app} history={this.props.history}></NavBar>
                    <div className="content">
                        <div className="middle-content">
                            <div className="posts">
                                <Post
                                    app={this.props.app}
                                    history={this.props.history}
                                    post={this.state.post}
                                    onDeleteClick={this.onPostDeleteClick}
                                    isSpecificView={true}
                                ></Post>
                            </div>

                            <RatingForm cantRate={this.checkIfRated()} criteriaLabels={this.state.criteriaLabels} submithandler={this.submithandler.bind(this)}></RatingForm>

                            <div className="oldRatingsContainer">
                                {this.state.oldRatings.map((oldRating, i) => {
                                    return (
                                        <div className="oldRatingContainer" key={i}>
                                            <OldRating obj={oldRating}></OldRating>
                                            {this.createDeletePostButton(oldRating)}
                                        </div>

                                    );
                                }
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            )
        } else {
            return (<div></div>)
        }
    }

    
    render() {
        return this.renderAfterDisplay()
    }
}

export default withRouter(SpecificPost)