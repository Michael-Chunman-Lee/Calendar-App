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

class SpecificPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // This information will eventually be obtained from the backend
            // In the meantime, we will use mock objects
            post: {},

            ratingLabels: ["Workload", "Interest", "Timing"],

            oldRatings: [
                {
                    ratingUsername: "TheLegend76",
                    ratingLabels: ["Workload", "Interest", "Timing"],
                    ratingValues: [1, 5, 4],
                    additionalReview: "Looks like some good stuff"
                }
            ],
            isLoading: true
        }
    }

    getData() {
        if (this.props.location.post) {
            this.setState({ post: this.props.location.post , isLoading: false})
        } else {

            fetch("/posts/id/" + this.props.postId)
            .then(res => {
                return res.json()
            })
            .then(json => {
                if (json !== undefined) {
                    this.setState({ post: json, isLoading: false });
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    componentDidMount() {
        this.getData();
    }

    removeRating(rating) {
        let filteredRatings = this.state.oldRatings.filter(s => {
            return s !== rating;
        });
        this.setState({
            oldRatings: filteredRatings
        });
    }


    submithandler() {

   

        let newUsername = "Robert";   // Depending on how username is stored, we will get it from there, this would require processing the login and retrieving its username
        let newRatingLabels = this.state.ratingLabels;
        let newRatingValues = []
        for (let i = 0; i < this.state.ratingLabels.length; i++) {
            let label = this.state.ratingLabels[i];
            newRatingValues.push(parseInt(document.getElementsByClassName(label + i)[0].innerText))
        }
        let newAddtionalReview = document.getElementsByClassName("inputFormAddtionalReview")[0].value;


        let newRating = {
            ratingUsername: newUsername,
            ratingLabels: newRatingLabels,
            ratingValues: newRatingValues,
            additionalReview: newAddtionalReview
        }


        this.setState({
            oldRatings: this.state.oldRatings.concat(newRating)
        })

    }

    onPostClick = (e) => {
        return;
    }
    
    createDeletePostButton(oldRating) {
        if (this.props.app.state.isAdmin) {
            return <IconButton onClick={this.removeRating.bind(oldRating)} color="inherit"                        className="removeRatingButton">
                                            <CloseIcon />
                                        </IconButton>;
        } else {
            return <div></div>
        }
    }

    renderAfterDisplay() {
        if (!this.state.isLoading) {
            return (
                <div className="main-div">
                    <NavBar name={this.state.name} app={this.props.app} history={this.props.history}></NavBar>
                    <div className="content">
                        <div className="middle-content">
                            <div className="posts">
                                <Post
                                    app={this.props.app}
                                    history={this.props.history}
                                    post={this.props.location.post}
                                ></Post>
                            </div>

                            <RatingForm ratingLabels={this.state.ratingLabels} submithandler={this.submithandler.bind(this)}></RatingForm>

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