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
        <h2 className="text-[14px] font-bold mb-2 truncate line-clamp-2">
          {course.courseName}
        </h2>
        <p className="bg-gray-100 rounded-lg p-2 text-gray-700 mb-2 flex-grow overflow-hidden max-h-24">
          <span className="line-clamp-3 text-[12px]">
            {course.courseDescription}
          </span>
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
        <div className="flex flex-row w-full justify-between items-center">
        <p className="mt-1">
            Recommendation:{" "}
            <span
              className={`font-bold ${getRecommendationColor(
                course.recommendationPercentage
              )}`}
            >
              {course.recommendationPercentage.toFixed(2)}%
            </span>
          </p>
          <div className="mt-2 flex items-center space-x-1">
            <button className="flex items-center space-x-1 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{course.upvotes}</span>
            </button>
            <button className="flex items-center space-x-1 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{course.downvotes}</span>
            </button>
          </div>

       
        </div>
      </div>
    </a>
  );
};

export default CourseCard;
