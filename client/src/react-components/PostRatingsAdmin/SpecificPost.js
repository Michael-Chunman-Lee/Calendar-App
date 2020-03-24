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

class SpecificPostAdmin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // This information will eventually be obtained from the backend
            // In the meantime, we will use mock objects
            post: {
                    name: 'Robert',
                    tag: 'Fitness',
                    title:
                        'My Grandfather turns the big 100 today!! Checkout his workout schedule!!',
                    icsRawText: sourceStr,
                    date: new Date(2019, 11, 24, 10, 33, 30, 0),
                    viewCount: 10
                },

            ratingLabels: ["Workload", "Interest", "Timing"],

            oldRatings: [
                {
                    ratingUsername: "TheLegend76",
                    ratingLabels: ["Workload", "Interest", "Timing"],
                    ratingValues: [1, 5, 4],
                    additionalReview: "Looks like some good stuff"
                }
            ]
        }
    }

    removeRating(rating) {
        let filteredRatings = this.state.oldRatings.filter(s => {
            return s !== rating;
        });
        console.log(filteredRatings);
        this.setState({
            oldRatings: filteredRatings
        });
    }


    submithandler() {

   
        let test = document.getElementsByClassName("Workload0")[0].innerText
        console.log(test);

        let newUsername = "Robert";   // Depending on how username is stored, we will get it from there, this would require processing the login and retrieving its username
        let newRatingLabels = this.state.ratingLabels;
        let newRatingValues = []
        for (let i = 0; i < this.state.ratingLabels.length; i++) {
            let label = this.state.ratingLabels[i];
            console.log(document.getElementsByClassName(label + i)[0])
            newRatingValues.push(parseInt(document.getElementsByClassName(label + i)[0].innerText))
        }
        let newAddtionalReview = document.getElementsByClassName("inputFormAddtionalReview")[0].value;
        console.log(newRatingValues);


        let newRating = {
            ratingUsername: newUsername,
            ratingLabels: newRatingLabels,
            ratingValues: newRatingValues,
            additionalReview: newAddtionalReview
        }

        console.log(newRating);

        this.setState({
            oldRatings: this.state.oldRatings.concat(newRating)
        })

    }

    onPostClick = (e) => {
        return;
    }
    
    render() {
        return (
            <div className="main-div">
                <NavBar name={this.state.name} username={this.props.location.username} userType={this.props.location.userType}></NavBar>
                <div className="content">
                    <div className="middle-content">
                        <div className="posts">
                            <Post post={this.state.post} onPostClick={this.onPostClick}></Post>
                        </div>

                        <RatingForm ratingLabels={this.state.ratingLabels} submithandler={this.submithandler.bind(this)}></RatingForm>

                        <div className="oldRatingsContainer">
                            {this.state.oldRatings.map((oldRating, i) => {
                                return (
                                    <div className="oldRatingContainer" key={i}>
                                        <OldRating obj={oldRating}></OldRating>
                                        <IconButton onClick={this.removeRating.bind(this, oldRating)} color="inherit" className="removeRatingButton">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    
                                );
                            }
                            )}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(SpecificPostAdmin)