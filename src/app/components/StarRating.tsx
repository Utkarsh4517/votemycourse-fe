'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ onRatingChange }: any) => {
  const [rating, setRating] = useState(0);
  const handleRating = (rate: any) => {
    setRating(rate);
    onRatingChange(rate); 
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((value) => (
        <FontAwesomeIcon
          key={value}
          icon={faStar}
          className={`cursor-pointer text-4xl my-3 ${value <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
          onClick={() => handleRating(value)}
        />
      ))}
    </div>
  );
};

export default StarRating;
