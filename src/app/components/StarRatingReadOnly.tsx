'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface StarRatingReadOnlyProps {
  rating: number; 
  totalStars?: number;
}

const StarRatingReadOnly: React.FC<StarRatingReadOnlyProps> = ({ rating, totalStars = 5 }) => {
  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className={`text-[10px] my-3 ${index + 1 <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
        />
      ))}
    </div>
  );
};

export default StarRatingReadOnly;
