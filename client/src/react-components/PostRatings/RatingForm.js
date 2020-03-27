import React, { Component } from "react";
import "./RatingForm.css";
import StarRatings from "./StarRatings";
import Button from "@material-ui/core/Button";

export default class PostRatings extends Component {

    render() {
        console.log(this.props.criteriaLabels[0]);
        return (
            <div className="reviewForm">
                <div className="leaveARating">Leave a Rating!</div>
                <div className="formContainer">
                    <div className="starForm">
                        <div className="starTable">
                            <div className="criteriaHeader">Criteria:</div>
                            {this.props.criteriaLabels.map((crit, i) => (
                                <div key={i} className={"starRow" + i}>
                                    <StarRatings label={crit} index={i}/>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="inputForm">
                        <form>
                            <textarea className="inputFormAddtionalReview" defaultValue="Anything you would like to add?"></textarea>
                        </form>
                    </div>
                </div>
                <div className="buttonContainer">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.props.submithandler}
                    >
                        Rate it!
          </Button>
                </div>

            </div>
        );
    }
}
