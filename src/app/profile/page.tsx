"use client";
import { useEffect, useState } from "react";
import { playFairDisplayFont, sahityaFont } from "../fonts/fonts";
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!courseName.trim()) {
      newErrors.courseName = "Course name is required";
    }

    if (!authorName.trim()) {
      newErrors.authorName = "Author name is required";
    }

    if (!courseUrl.trim()) {
      newErrors.courseUrl = "Course URL is required";
    } else if (!/^https?:\/\/.+/.test(courseUrl)) {
      newErrors.courseUrl = "Invalid URL format";
    }

    if (!courseThumbnailUrl.trim()) {
      newErrors.courseThumbnailUrl = "Course thumbnail URL is required";
    } else if (!/^https?:\/\/.+/.test(courseThumbnailUrl)) {
      newErrors.courseThumbnailUrl = "Invalid URL format";
    }

    if (!courseDescription.trim()) {
      newErrors.courseDescription = "Course description is required";
    }

    if (price.trim() && isNaN(parseFloat(price))) {
      newErrors.price = "Price must be a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!user) return;

    if (!validateForm()) {
      setToastMessage("Please correct the errors in the form");
      return;
    }

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
    } catch (error: any) {
      console.error("Error adding course:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setToastMessage(error.response.data.error);
      } else {
        setToastMessage("Failed to add the course. Please try again.");
      }
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
    setErrors({});
  };

  return (
    <div className="min-h-screen flex bg-[#EE3617] p-4">
      <div className="bg-white w-full max-w-[1400px] h-[800px] rounded-[20px] md:rounded-[40px] shadow-lg flex flex-col md:flex-row p-4 md:p-6 mx-auto">
        {/* Left Sidebar */}
        <div className="md:w-1/3 lg:w-1/4 space-y-6 pr-4 sm:h-screen h-screen lg:h-auto">
          {user && (
            <div className="text-center space-y-4 text-black">
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

          <div className="flex justify-center">
            {!formVisible && (
              <button
                className="bg-[#EE3617] px-6 md:px-8 py-2 rounded-full hover:bg-white hover:text-[#EE3617] transition-all duration-300 ease-in-out cursor-pointer hover:border-[#EE3617] border"
                onClick={() => setFormVisible(!formVisible)}
              >
                <div className={`${sahityaFont} text-sm md:text-base text-white hover:text-[#EE3617]`}>
                  Add a new course
                </div>
              </button>
            )}
          </div>

          {formVisible && (
            <div className="space-y-4 w-full">
              <div>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Course Name"
                  className={`w-full p-2 border rounded text-black ${
                    errors.courseName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.courseName && (
                  <p className="text-red-500 text-sm mt-1">{errors.courseName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Author Name"
                  className={`w-full p-2 border rounded text-black ${
                    errors.authorName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.authorName && (
                  <p className="text-red-500 text-sm mt-1">{errors.authorName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  value={courseUrl}
                  onChange={(e) => setCourseUrl(e.target.value)}
                  placeholder="Course URL"
                  className={`w-full p-2 border rounded text-black ${
                    errors.courseUrl ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.courseUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.courseUrl}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  value={courseThumbnailUrl}
                  onChange={(e) => setCourseThumbnailUrl(e.target.value)}
                  placeholder="Course Thumbnail URL"
                  className={`w-full p-2 border rounded text-black ${
                    errors.courseThumbnailUrl ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.courseThumbnailUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.courseThumbnailUrl}</p>
                )}
              </div>
              <div>
                <textarea
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="Course Description"
                  className={`w-full p-2 border rounded text-black ${
                    errors.courseDescription ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.courseDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.courseDescription}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price (Keep empty if free)"
                  className={`w-full p-2 border rounded text-black ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div className="flex space-x-4 justify-center">
                <button
                  onClick={handleSubmit}
                  className="bg-[#EE3617] px-6 md:px-8 py-2 rounded-full hover:bg-white hover:text-[#EE3617] transition-all duration-300 ease-in-out cursor-pointer hover:border-[#EE3617] border"
                >
                  <div className={`${sahityaFont} italic text-sm md:text-base text-white hover:text-[#EE3617]`}>
                    Add course
                  </div>
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-400 px-6 md:px-8 py-2 rounded-full hover:bg-white hover:text-gray-600 transition-all duration-300 ease-in-out cursor-pointer hover:border-gray-600 border"
                >
                  <div className={`${sahityaFont} italic text-sm md:text-base`}>
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
        </div>

        {/* Right Side - Courses */}
        <div className="md:w-2/3 lg:w-3/4 overflow-y-auto mt-6 md:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.courseId} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}