import React, { Component, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRatings.css";

const StarRating = (props) => {
  // props.rating signals that the stars are to remain static since a value is already assigned
    const [rating, setRating] = useState((props.rating) ? props.rating: 1);
    const [hover, setHover] = useState((props.rating) ? props.rating: 1);
    
    return (
        <div className = "rating">
          <div>
            <span className="starsLabel">{props.label}</span>
          </div>

          <div>
            {[...Array(5)].map((star, i) => {
              let ratingValue = i + 1;
              let isDisabled;
              if (props.rating) {isDisabled = true} else {isDisabled=false}
                return (
                    <label>
                        <input type="radio" className="stars"
                               value={ratingValue}
                               disabled={isDisabled}
                               onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#00b0f0" : "#eaf6ff" }
                            size={20}
                            onMouseEnter={() => setHover((props.rating) ? props.rating : ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
                <span className={props.label + props.index}>{rating}</span>
          </div>
        </div>
    );
};

export default StarRating;
            