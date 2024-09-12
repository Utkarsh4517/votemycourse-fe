'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CircularProgress from "../../components/CircularProgress";
import PrimaryButton from "../../components/PrimaryButton";
import Course from "../../types/course";
import { render } from "react-dom";
import StarRating from "../../components/StarRating";


export default function CoursePage({ params }: { params: { id: string[] } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const baseUrl = "https://api.votemycourse.com";

  const handleRatingChange = (newRating: any) => {
    console.log('Selected Rating:', newRating);
  };

  useEffect(() => {
    const courseId = params.id[0];
    fetchCourse(courseId);
  }, [params.id]);

  const fetchCourse = async (courseId: string) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${baseUrl}/api/courses/id/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course:", error);
      setError("Failed to fetch course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Review submitted");
    setShowReviewForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EE3617]">
        <CircularProgress/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EE3617] p-4">
       ERROR
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EE3617] p-4">
      <div className="bg-white w-full h-[calc(100vh-30px)] rounded-3xl shadow-lg overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative w-full lg:w-1/2 aspect-video">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CircularProgress/>
                </div>
              )}
              <Image
                src={course.courseThumbnailUrl}
                alt={course.courseName}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            <div className="flex flex-col justify-between lg:w-1/2">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{course.courseName}</h1>
                <p className="bg-gray-100 rounded-lg p-4 text-gray-700 mb-4">
                  {course.courseDescription}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-semibold">Price:</span>
                  <span className="font-bold">${course.price}</span>
                </div>
                <p className="text-gray-600 italic">by {course.authorName}</p>
              </div>
              <PrimaryButton onClick={() => setShowReviewForm(true)}>Put a review</PrimaryButton>
            </div>
          </div>
          {showReviewForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">How much do you rate this course?</label>
                   
                           <StarRating onRatingChange={handleRatingChange} />
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Review Title</label>
                    <input type="text" id="title" required 
                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                  </div>
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Review Content</label>
                    <textarea id="content" required rows={4}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button type="button" onClick={() => setShowReviewForm(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Cancel
                    </button>
                    <button type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}