"use client";
import { useEffect, useState } from "react";
import { playFairDisplayFont } from "../fonts/fonts";
import User from "../types/users";
import axios from "axios";
import { useRouter } from "next/navigation";
import { headers } from "next/headers";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [courseName, setCourseName] = useState("");
  const [courseUrl, setCourseUrl] = useState("");
  const [token, setToken] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [price, setPrice] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const baseUrl = "https://api.votemycourse.com";
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
    }
    setToken(token!);
  }, [router]);

  const handleSubmit = async () => {
    if (!user) return;

    const courseData = {
      courseName,
      courseUrl,
      courseDescription,
      price,
      addedBy: {
        userId: user.userId,
      },
    };

    try {
      const response = await axios.post(`${baseUrl}/api/courses/add`, {
        headers: { Authorization: `Bearer ${token}` },
        courseData,
      });
      console.log("Course added:", response.data);
      if (response.status === 200) {
        setToastMessage("Course added successfully!");
        resetForm();
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
    setPrice("");
    setFormVisible(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EE3617] p-4">
      <div className="bg-white w-full max-w-[1400px] min-h-[400px] md:h-[800px] rounded-[20px] md:rounded-[40px] shadow-lg flex flex-col items-center p-4 md:p-6 space-y-4">
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
              value={courseUrl}
              onChange={(e) => setCourseUrl(e.target.value)}
              placeholder="Course URL"
              className="w-full p-2 border border-gray-300 rounde text-black"
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
      </div>
    </div>
  );
}
