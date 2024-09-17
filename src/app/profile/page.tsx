"use client";
import { useEffect, useState } from "react";
import { playFairDisplayFont } from "../fonts/fonts";
import User from "../types/users";
import axios from "axios";
import { useRouter } from "next/navigation";
import CourseCard from "../components/CourseCard";
import Course from "../types/course";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseName, setCourseName] = useState("");
  const [courseUrl, setCourseUrl] = useState("");
  const [token, setToken] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseThumbnailUrl, setCourseThumbnailUrl] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [price, setPrice] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const baseUrl = "https://api.votemycourse.com";
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser) as User;
      setUser(parsedUser);
      setToken(storedToken);
      fetchCourses(parsedUser.userId, storedToken);
    } else {
      router.replace("/");
    }
  }, [router]);

  const fetchCourses = async (userId: number, token: string) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/courses/addedBy/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Profile Courses:", response.data);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    const courseData = {
      courseName,
      courseUrl,
      courseDescription,
      courseThumbnailUrl,
      price,
      authorName,
      addedBy: {
        userId: user.userId,
      },
    };

    try {
      const response = await axios.post(
        `${baseUrl}/api/courses/add`,
        courseData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Course added:", response.data);
      if (response.status === 200) {
        setToastMessage("Course added successfully!");
        resetForm();
        fetchCourses(user.userId, token);
      }
    } catch (error) {
      console.error("Error adding course:", error);
      setToastMessage("Failed to add the course. Please try again.");
    }
  };

  const resetForm = () => {
    setCourseName("");
    setCourseUrl("");
    setCourseDescription("");
    setCourseThumbnailUrl("");
    setPrice("");
    setAuthorName("");
    setFormVisible(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EE3617] p-4">
      <div className="bg-white w-full max-w-[1400px] h-[800px] rounded-[20px] md:rounded-[40px] shadow-lg flex flex-col p-4 md:p-6">
        <div className="flex-grow overflow-y-auto">
          <div className="space-y-4">
            {user && (
              <div className="text-center space-y-4 text-black w-full">
                <div className="flex justify-center">
                  <img
                    src={user.profileUrl}
                    alt={user.name}
                    className="rounded-full w-24 h-24 md:w-36 md:h-36"
                  />
                </div>
                <p className="text-base md:text-lg">{user.name}</p>
              </div>
            )}

            {!formVisible && (
              <div className="flex justify-center">
                <div
                  className="bg-[#EE3617] px-6 md:px-8 py-2 rounded-full hover:bg-white hover:text-[#EE3617] transition-all duration-300 ease-in-out cursor-pointer"
                  onClick={() => setFormVisible(true)}
                >
                  <div
                    className={`${playFairDisplayFont} italic text-white hover:text-[#EE3617] text-sm md:text-base`}
                  >
                    Add a new course
                  </div>
                </div>
              </div>
            )}

            {formVisible && (
              <div className="space-y-4 w-full">
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Course Name"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Author Name"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
                <input
                  type="text"
                  value={courseUrl}
                  onChange={(e) => setCourseUrl(e.target.value)}
                  placeholder="Course URL"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
                <input
                  type="text"
                  value={courseThumbnailUrl}
                  onChange={(e) => setCourseThumbnailUrl(e.target.value)}
                  placeholder="Course Thumbnail URL"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
                <textarea
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="Course Description"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />

                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={handleSubmit}
                    className="bg-[#EE3617] px-6 md:px-8 py-2 rounded-full hover:bg-white hover:text-[#EE3617] transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    <div
                      className={`${playFairDisplayFont} italic text-white hover:text-[#EE3617] text-sm md:text-base`}
                    >
                      Submit
                    </div>
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-gray-400 px-6 md:px-8 py-2 rounded-full hover:bg-white hover:text-gray-600 transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    <div
                      className={`${playFairDisplayFont} italic text-white hover:text-gray-600 text-sm md:text-base`}
                    >
                      Cancel
                    </div>
                  </button>
                </div>
              </div>
            )}

            {toastMessage && (
              <div className="mt-4 p-2 bg-green-500 text-white rounded">
                {toastMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <CourseCard key={course.courseId} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}