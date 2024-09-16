"use client";
import React from "react";
import { Review } from "../types/review";
import { playFairDisplayFont } from "../fonts/fonts";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div key={review.reviewId} className="border p-2 rounded-lg shadow text-black">
      <h2 className="text-sm">{review.comment}</h2>

      <p className="text-[8px] text-gray-500">by {review.user.name}</p>
      <p className={`text-[8px] italic text-gray-500`}>added on {new Date(review.createdAt).toLocaleDateString('en-US', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
})}</p>

    </div>
  );
};

export default ReviewCard;
