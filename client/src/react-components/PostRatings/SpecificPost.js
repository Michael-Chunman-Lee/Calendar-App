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
        console.log('/posts/delete-rating/' + this.state.post._id)
        console.log(rating)
        
        return fetch('/posts/delete-rating/' + this.state.post._id, {
            method: 'delete',
            body: JSON.stringify(rating)
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => {
            console.log(error);
        });
    }


    submithandler() {

   

        let newUsername = "Robert";   // Depending on how username is stored, we will get it from there, this would require processing the login and retrieving its username
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


        this.setState({
            oldRatings: this.state.oldRatings.concat(newRating)
        })

    }

    onPostClick = (e) => {
        return;
    }
    
    createDeletePostButton(oldRating) {
        if (this.props.app.state.isAdmin) {
            return <IconButton onClick={() => this.removeRating(oldRating)} color="inherit"                        className="removeRatingButton">
                                            <CloseIcon />
                                        </IconButton>;
        } else {
            return <div></div>
        }
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
                                ></Post>
                            </div>

                            <RatingForm criteriaLabels={this.state.criteriaLabels} submithandler={this.submithandler.bind(this)}></RatingForm>

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