"use client";
import React from "react";
import { Review } from "../types/review";
import { playFairDisplayFont } from "../fonts/fonts";
import StarRatingReadOnly from "./StarRatingReadOnly";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div
      key={review.reviewId}
      className="border p-2 rounded-lg shadow text-black"
    >
      <h2 className="text-sm">{review.comment}</h2>
      <div>
        {review.recommended === true ? <span className="text-green-600 text-sm font-bold">Recommended</span> : <span className="text-red-600 text-sm font-bold">Not Recommended</span>}
      </div>

      <p className="text-[8px] text-gray-500">by {review.user.name}</p>
      <div className="flex flex-row items-center justify-between">
      <p className={`text-[8px] italic text-gray-500`}>
        added on{" "}
        {new Date(review.createdAt).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
      <StarRatingReadOnly rating={review.rating} totalStars={5} />


      </div>
     
    </div>
  );
};

export default ReviewCard;
