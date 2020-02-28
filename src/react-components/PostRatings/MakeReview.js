import React, { Component } from 'react'
import './MakeReview.css'
import StarRatings from './StarRatings'

export default class PostRatings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'Robert',
        }
    }

    render() {
        
        let criteria = ["Workload", "Interest", "Timing"];
        
        return (
            <div className="newReview">
                <div className="header"> Leave a Rating! </div>
                <div className="criteria">
                    <div className="criteriaHeader"> Criteria: </div>

                  {criteria.map(crit =>(
                    <div className="critlabel"><div>{crit}<StarRatings></StarRatings></div></div>
                  ))}
                </div>
                    
                  
                <div className="textInputBox">
                <form><textarea>Anything you wanna add?</textarea></form>
                </div>
                <div className="rateButtonContainer">
                  <button className="rateButton"> Rate It! </button>
                </div>
            </div>
        )
    }
}
