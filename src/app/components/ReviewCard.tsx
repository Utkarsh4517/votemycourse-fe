"use client";
import React from "react";
import { Review } from "../types/review";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div key={review.reviewId} className="border p-4 rounded shadow text-black">
      <h2 className="text-xl font-bold">{review.comment}</h2>

      <p>Added By: {review.user.name}</p>
      <p>Created At: {new Date(review.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default ReviewCard;
