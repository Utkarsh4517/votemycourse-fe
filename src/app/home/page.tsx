'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { baseUrl } from '../constants/exports';

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
  addedBy: User; // Change this to match the actual data structure
  createdAt: string;
}

function Home() {
  // Define the types for the state
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/');
    }
  }, [router]);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${baseUrl}/api/courses/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Courses:', response.data);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to fetch courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">VoteMyCourse - Home</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <button 
        onClick={fetchCourses}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Fetch All Courses
      </button>
      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {courses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.courseId} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold">{course.courseName}</h2>
              <p>ID: {course.courseId}</p>
              <p>URL: {course.courseUrl}</p>
              <p>Description: {course.courseDescription}</p>
              <p>Price: ${course.price}</p>
              <p>Verified: {course.verified ? 'Yes' : 'No'}</p>
              {/* <p>Added By: {course.addedBy.username}</p> Accessing username */}
              <p>Created At: {new Date(course.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
