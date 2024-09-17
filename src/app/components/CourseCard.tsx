"use client";
import React from "react";
import Course from "../types/course";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getRecommendationColor = (percentage: number): string => {
    if (percentage < 25) return "text-red-500";
    if (percentage < 50) return "text-orange-500";
    if (percentage < 75) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <a href={`/home/${course.courseId}`} className="block h-full">
      <div
        key={course.courseId}
        className="border p-4 rounded-2xl shadow text-black h-[380px] flex flex-col"
      >
        <img
          src={course.courseThumbnailUrl}
          className="h-44 w-full object-cover mb-2 rounded-lg"
          alt={course.courseName}
        ></img>
        <h2 className="text-[14px] font-bold mb-2 truncate line-clamp-2">{course.courseName}</h2>
        <p className="bg-gray-100 rounded-lg p-2 text-gray-700 mb-2 flex-grow overflow-hidden max-h-24">
          <span className="line-clamp-3 text-[12px]">{course.courseDescription}</span>
        </p>
        <div className="flex flex-row items-center justify-between">
          <p className="mt-auto ">
            Price:{" "}
            <span className="font-semibold">${course.price.toFixed(2)} </span>
          </p>
          <p className="mt-auto italic text-gray-500 text-[10px]">
            by {course.authorName}
          </p>
        </div>
        <p className="mt-1">
          Recommendation:{" "}
          <span
            className={`font-bold ${getRecommendationColor(
              course.recommendationPercentage
            )}`}
          >
            {course.recommendationPercentage}%
          </span>
        </p>
      </div>
    </a>
  );
};

export default CourseCard;
