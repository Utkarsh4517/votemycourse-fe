"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CourseCard from "../components/CourseCard";

interface User {
  userId: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Course {
  courseId: number;
  courseName: string;
  courseUrl: string;
  courseDescription: string;
  price: number;
  verified: boolean;
  addedBy: User;
  createdAt: string;
}

function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const baseUrl = "https://api.votemycourse.com";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
    }
    fetchCourses();
  }, [router]);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${baseUrl}/api/courses/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Courses:", response.data);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to fetch courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EE3617]">
      <div className="bg-white w-full max-w-[1400px] h-[800px] rounded-[40px] shadow-lg flex flex-col items-center p-6 space-y-4">
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-[800px] p-3 px-6 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#EE3617]"
        />

        <div className="w-full h-full overflow-y-auto">
          {loading && <p className="text-center">Loading courses...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <CourseCard key={course.courseId} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
