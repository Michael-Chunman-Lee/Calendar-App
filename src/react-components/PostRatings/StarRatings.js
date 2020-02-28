import React, { Component, useState } from 'react'
import { FaStar } from "react-icons/fa";
import './StarRatings.css'


const StarRating = () => {
    const [rating, setRating] = useState(1);
    const [hover, setHover] = useState(1);
    
    return (
        <span>
            {[ ... Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                
                return (
                    <label>
                        <input
                            type="radio"
                            className="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}

                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={20}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
            <span className> Choice: {rating} </span>
        </span>
    );
};
                    
export default StarRating;
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    