import React from 'react';

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

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div key={course.courseId} className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{course.courseName}</h2>
      <p>ID: {course.courseId}</p>
      <p>URL: <a href={course.courseUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{course.courseUrl}</a></p>
      <p>Description: {course.courseDescription}</p>
      <p>Price: ${course.price.toFixed(2)}</p>
      <p>Verified: {course.verified ? 'Yes' : 'No'}</p>
      <p>Added By: {course.addedBy.username}</p>
      <p>Created At: {new Date(course.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default CourseCard;
