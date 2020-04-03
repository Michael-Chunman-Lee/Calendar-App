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
      <div className="oldReviewForm">
        <div className="reviewerUsername">{this.props.obj.username}</div>
        <div className="criteriaHeader">Criteria:</div>
        <div className="formContainer">
          <div className="starForm">
            <div className="starTable">
            
              {this.props.obj.criteriaLabels.map((crit,i) => (
                <div className="starRow" key={i}>
                  <StarRatings label={crit} rating={this.props.obj.criteriaRatings[i]}/>
                </div>
              ))}
            </div>
          </div>

          <div className="oldReview">
              <div className="additionalCommentText">{this.props.obj.additionalComment}</div>
          </div>
        </div>

      </div>
    );
  }
}
