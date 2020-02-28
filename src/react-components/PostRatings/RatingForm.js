import React, { Component } from "react";
import "./RatingForm.css";
import StarRatings from "./StarRatings";
import Button from "@material-ui/core/Button";

export default class PostRatings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      criteria: ["Workload", "Interest", "Timing"]
    };
  }

  render() {
    return (
      <div className="reviewForm">
        <div className="leaveARating">Leave a Rating!</div>
        <div className="formContainer">
          <div className="starForm">
            <div className="starTable">
            <div className="criteriaHeader">Criteria:</div>
              {this.state.criteria.map(crit => (
                <div className="starRow">
                  <StarRatings label={crit} />
                </div>
              ))}
            </div>
          </div>

          <div className="inputForm">
            <form>
              <textarea>
                Anything you would like to add?
              </textarea>
            </form>
          </div>
        </div>

        <div className="buttonContainer">
          <Button variant="contained" color="primary" onClick={function () {return}}>
            Rate it!
          </Button>
        </div>

      </div>
    );
  }
}
