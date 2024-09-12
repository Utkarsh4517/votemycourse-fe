'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CircularProgress from "../../components/CircularProgress";
import PrimaryButton from "../../components/PrimaryButton";


type Course = {
  courseName: string;
  courseDescription: string;
  courseThumbnailUrl: string;
  price: number;
  authorName: string;
};

export default function CoursePage({ params }: { params: { id: string[] } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const baseUrl = "https://api.votemycourse.com";

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
                  <span className=" font-bold">${course.price}</span>
                </div>
                <p className="text-gray-600 italic">by {course.authorName}</p>
              </div>
              <PrimaryButton>Put a review</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}