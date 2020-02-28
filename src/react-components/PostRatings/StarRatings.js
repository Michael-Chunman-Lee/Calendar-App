import React, { Component, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRatings.css";

const StarRating = (props) => {
    const [rating, setRating] = useState(1);
    const [hover, setHover] = useState(1);
    
    return (
        <div className = "rating">
          <div>
            <span className="starsLabel">{props.label}</span>
          </div>

          <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label>
                        <input type="radio" className="stars"
                               value={ratingValue}
                               onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#00b0f0" : "#eaf6ff" }
                            size={20}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
          </div>
        </div>
    );
};

export default StarRating;
            