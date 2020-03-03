import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import './SpecificPost.css'
import Post from '../Post/Post'

import RatingForm from './RatingForm'
import OldRating from './OldRating'

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';

export default class SpecificPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: {
                    name: 'Robert',
                    tag: 'Fitness',
                    title:
                        'My Grandfather turns the big 100 today!! Checkout his workout schedule!!',
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

    render() {
        return (
            <div className="main-div">
                <NavBar name={this.state.name}></NavBar>
                <div className="content">
                    <div className="middle-content">
                        <div className="posts">
                            <Post post={this.state.post}></Post>
                        </div>

                        <RatingForm ratingLabels={this.state.ratingLabels} submithandler={this.submithandler.bind(this)}></RatingForm>

                        <div className="oldRatingsContainer">
                            {this.state.oldRatings.map(oldRating => {
                                return (
                                    <div className="oldRatingContainer">
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
                    {
                        //Api call to get profile info (if not current user profile)
                    }
                </div>

            </div>
        )
    }
}