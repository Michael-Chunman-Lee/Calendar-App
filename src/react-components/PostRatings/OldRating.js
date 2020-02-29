import React, { Component } from "react";
import "./OldRating.css";
import StarRatings from "./StarRatings";

export default class OldRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="reviewForm">
        <div className="reviewerUsername">{this.props.obj.ratingUsername}</div>
        <div className="formContainer">
          <div className="starForm">
            <div className="starTable">
            <div className="criteriaHeader">Criteria:</div>
              {this.props.obj.ratingLabels.map((crit,i) => (
                <div className="starRow">
                  <StarRatings label={crit} rating={this.props.obj.ratingValues[i]}/>
                </div>
              ))}
            </div>
          </div>

          <div className="oldReview">
              <div className="additionalReviewText">{this.props.obj.additionalReview}</div>
          </div>
        </div>

      </div>
    );
  }
}
