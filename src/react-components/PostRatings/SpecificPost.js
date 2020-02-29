import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import './SpecificPost.css'
import Post from '../Post/Post'
import ProfileBox from '../ProfileBox/ProfileBox'
import FlairBox from '../FlairBox/FlairBox'

import RatingForm from './RatingForm'
import OldRating from './OldRating'
import Button from "@material-ui/core/Button";

export default class SpecificPost extends Component {
    constructor(props) {
        super(props)

        this.state = {

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
                            <Post title="My Grandfather turns the big 100 today!! Checkout his workout schedule!!"></Post>
                        </div>

                        <RatingForm ratingLabels={this.state.ratingLabels} submithandler={this.submithandler.bind(this)}></RatingForm>

                        <div className="oldRatingsContainer">
                            {this.state.oldRatings.map(oldRating => {
                                return (
                                    <OldRating obj={oldRating}></OldRating>
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
