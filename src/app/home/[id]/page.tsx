"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CircularProgress from "../../components/CircularProgress";
import PrimaryButton from "../../components/PrimaryButton";
import Course from "../../types/course";
import StarRating from "../../components/StarRating";
import User from "../../types/users";
import { useRouter } from "next/navigation";
import { Review } from "../../types/review";
import ReviewCard from "../../components/ReviewCard";
import { sahityaFont } from "../../fonts/fonts";

export default function CoursePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const baseUrl = "https://api.votemycourse.com";

  const getRecommendationColor = (percentage: number): string => {
    if (percentage < 25) return "text-red-500";
    if (percentage < 50) return "text-orange-500";
    if (percentage < 75) return "text-yellow-500";
    return "text-green-500";
  };

  const handleRatingChange = (newRating: number) => {
    console.log("Selected Rating:", newRating);
    setRating(newRating);
  };

  const handleRecommendationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  const handleUpvote = async () => {
    if (!course || !user) return;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${baseUrl}/api/courses/${course.courseId}/upvote`,
        null,
        {
          params: { userId: user.userId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourse(response.data);
    } catch (error: Response | any) {
      console.error("Error upvoting course:", error.response.data);
    }
  };

  const handleDownvote = async () => {
    if (!course || !user) return;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${baseUrl}/api/courses/${course.courseId}/downvote`,
        null,
        {
          params: { userId: user.userId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourse(response.data);
    } catch (error) {
      console.error("Error downvoting course:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching course...");
    const courseId = params.id;
    fetchCourse(courseId);
    fetchReviews(courseId);
  }, [params.id]);

  const fetchCourse = async (courseId: string) => {
    console.log("fetchCourse started for courseId:", courseId);
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    console.log("Token available:", !!token);
    
    try {
      const response = await axios.get(
        `${baseUrl}/api/courses/id/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("API response:", response);
      if (response.data) {
        setCourse(response.data);
        console.log("Course data set:", response.data);
      } else {
        console.log("API returned empty data");
        setError("No course data received from the server");
      }
    } catch (error: any) {
      console.error("Error fetching course:", error);
      setError(error.response?.data?.message || "Failed to fetch course. Please try again.");
    } finally {
      console.log("fetchCourse completed");
      setLoading(false);
    }
  };

  const fetchReviews = async (courseId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${baseUrl}/api/reviews/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Reviews fetched:", response.data);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log("Stored user:", storedUser);
    console.log("Token available:", !!token);
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  const handleReviewSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
      return;
    }
    if (!user || !course) return;

    const courseData = {
      user: {
        userId: user.userId,
      },
      course: {
        courseId: course.courseId,
      },
      rating,
      comment: content,
      recommended: selectedOption === "yes",
    };
    console.log("Review Data:", courseData);

    try {
      const response = await axios.post(
        `${baseUrl}/api/reviews/add`,
        courseData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Review added:", response.data);
      if (response.status === 200) {
        console.log("Review added successfully!");
        await fetchReviews(params.id[0]);
      }
    } catch (error) {
      console.error("Error adding Review:", error);
    }

    setShowReviewForm(false);
    setRating(0);
    setSelectedOption("");
    setContent("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EE3617]">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EE3617] p-4">
        <p className="text-white">Error: {error}</p>
      </div>
    );
  }

  if (!course) {
    console.log("Course data is null, loading:", loading, "error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EE3617] p-4">
        <p className="text-white">
          {loading ? "Loading course data..." : error || "No course data available"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EE3617] p-4">
      <div className="bg-white w-full h-[calc(100vh-30px)] rounded-3xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Left side: Course details */}
        <div className="w-full lg:w-1/2 h-screen lg:h-auto p-4 lg:p-6 sm:h-screen">
          <div className="space-y-4 lg:space-y-6 h-full flex flex-col">
            <div className="relative w-full h-1/3 lg:h-auto aspect-video">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CircularProgress />
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
            <div className="flex-1 overflow-y-auto">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2 lg:mb-4">
                {course.courseName}
              </h1>
              <p className="bg-gray-100 rounded-lg p-3 lg:p-4 text-gray-700 mb-3 lg:mb-4">
                {course.courseDescription}
              </p>
              <div className="flex flex-row w-full justify-between">
                <div className="flex items-center justify-start mb-2">
                  <span className="text-gray-600 font-semibold">Price:</span>
                  <span className="mx-1"></span>
                  <span className="font-bold text-black">${course.price}</span>
                </div>

                <div className="mt-2 flex items-center space-x-4">
                  <button
                    onClick={handleUpvote}
                    className="flex items-center space-x-1 text-green-500 hover:text-green-600"
                  >
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
                  <button
                    onClick={handleDownvote}
                    className="flex items-center space-x-1 text-red-500 hover:text-red-600"
                  >
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

              <p className="text-gray-600 italic">by {course.authorName}</p>
              <p className="mt-1 text-black">
                This is recommended in{" "}
                <span
                  className={`font-bold ${getRecommendationColor(
                    course.recommendationPercentage
                  )}`}
                >
                  {course.recommendationPercentage.toFixed(2)}%
                </span>
                <span className="text-black ml-1">of reviews</span>
              </p>
            </div>
            <div className="flex flex-col space-y-3 lg:space-y-4">
              <button
                className={`bg-[#EE3617] px-4 lg:px-6 py-2 lg:py-3 rounded-full ${sahityaFont} text-white italic inline-flex text-center justify-center hover:bg-white hover:text-[#EE3617] transition-all duration-300 ease-in-out hover:border-[#EE3617] border`}
                onClick={() => {
                  let url = course.courseUrl;
                  if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                  }
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
              >
                View Course
              </button>
              <PrimaryButton onClick={() => setShowReviewForm(true)}>
                Put a review
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Right side: Reviews */}
        <div className="w-full lg:w-1/2 p-6 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.reviewId} review={review} />
            ))}
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700"
                  >
                    How much do you rate this course?
                  </label>
                  <StarRating onRatingChange={handleRatingChange} />
                </div>
                <div>
                  <label
                    htmlFor="recommendation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Will you recommend this course to others?
                  </label>
                  <div className="flex flex-row gap-10 text-black mt-2">
                    <label>
                      <input
                        type="radio"
                        name="recommendation"
                        value="yes"
                        checked={selectedOption === "yes"}
                        onChange={handleRecommendationChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="recommendation"
                        value="no"
                        checked={selectedOption === "no"}
                        onChange={handleRecommendationChange}
                      />
                      No
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Review Content
                  </label>
                  <textarea
                    id="content"
                    required
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-1 block text-black p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit Review
                  </button>
                </div>{" "}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
