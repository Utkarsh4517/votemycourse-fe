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

export default function CoursePage({ params }: { params: { id: string[] } }) {
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

  const handleRatingChange = (newRating: any) => {
    console.log("Selected Rating:", newRating);
    setRating(newRating);
  };

  const handleReccomendationChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const courseId = params.id[0];
    fetchCourse(courseId);
    fetchReviews(courseId);
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
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  const handleReviewSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
      return;
    }
    event.preventDefault();
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
      recommend: selectedOption === "yes" ? true : false,
    };

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
        ERROR
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EE3617] p-4">
      <div className="bg-white w-full h-[calc(100vh-30px)] rounded-3xl shadow-lg overflow-hidden flex flex-col">
        <div className="p-6 space-y-6 flex-shrink-0">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative w-full lg:w-1/2 aspect-video">
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
            <div className="flex flex-col justify-between lg:w-1/2">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  {course.courseName}
                </h1>
                <p className="bg-gray-100 rounded-lg p-4 text-gray-700 mb-4">
                  {course.courseDescription}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-semibold">Price:</span>
                  <span className="font-bold">${course.price}</span>
                </div>
                <p className="text-gray-600 italic">by {course.authorName}</p>
              </div>
              <PrimaryButton onClick={() => setShowReviewForm(true)}>
                Put a review
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Scrollable Reviews Section */}
        <div className="flex-grow overflow-hidden">
          <h2 className="text-xl font-bold text-gray-800 mb-4 px-6">Reviews</h2>
          <div className="overflow-y-auto h-full px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((review) => (
                <ReviewCard key={review.reviewId} review={review} />
              ))}
            </div>
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
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Will you recommend this course to others?
                  </label>
                  <div className="flex flex-row gap-10 text-black mt-2">
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="yes"
                        checked={selectedOption === "yes"}
                        onChange={handleReccomendationChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="no"
                        checked={selectedOption === "no"}
                        className=""
                        onChange={handleReccomendationChange}
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
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}