"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CourseCard from "../components/CourseCard";
import Course from "../types/course";
import User from "../types/users";

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const baseUrl = "https://api.votemycourse.com";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
    }
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;
      setUser(parsedUser);
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

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EE3617]">
      <div className="bg-white w-full max-w-[1400px] h-[800px] rounded-[40px] shadow-lg flex flex-col items-center p-6 space-y-4">
        <div className="flex items-center w-full max-w-[800px] space-x-4">
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 px-6 rounded-full border text-[#EE3617] border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#EE3617]"
          />
          <div className="ml-auto">
            <img
              onClick={() => router.push("profile")}
              src={user?.profileUrl}
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold"
            ></img>
          </div>
          <div className="ml-auto">
            <button

              onClick={() => {
                router.push("/");
                localStorage.removeItem("token");
              }}
              className="text-black font-mono text-[10px]"
            > Logout </button>
          </div>
        </div>
        <div className="w-full h-full overflow-y-auto">
          {loading && <p className="text-center">Loading courses...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
