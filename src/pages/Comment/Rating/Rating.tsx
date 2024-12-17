import React from "react";
import "./Rating.css";

const Rating = ( { rating } : { rating : number } ) => {
  interface StarRatingProps {
    rating: number; // Example: 4.5
  }

  const fullStars = Math.floor(rating); // Full stars
  const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
  const totalStars = 5; // Total stars in the rating system

  return (
    <>
      <div className="star-rating">
        {Array.from({ length: totalStars }, (_, index) => {
          if (index < fullStars) {
            return <div key={index} className="star filled"></div>;
          }
          if (index === fullStars && hasHalfStar) {
            return <div key={index} className="star half"></div>;
          }
          return <div key={index} className="star"></div>;
        })}
      </div>
    </>
  );
};

export default Rating;
