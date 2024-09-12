'use client';
import React from 'react';
import Course from '../types/course';
import { Link } from 'react-router-dom';



interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <a href={`/home/${course.courseId}`}>
    <div key={course.courseId} className="border p-4 rounded shadow text-black">
      <h2 className="text-xl font-bold">{course.courseName}</h2>
      <p>ID: {course.courseId}</p>
      <p>URL: <a href={course.courseUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{course.courseUrl}</a></p>
      <p>Description: {course.courseDescription}</p>
      <p>Price: ${course.price.toFixed(2)}</p>
      <p>Verified: {course.verified ? 'Yes' : 'No'}</p>
      <p>Added By: {course.addedBy.name}</p>
      <p>Created At: {new Date(course.createdAt).toLocaleString()}</p>
    </div>
    </a>

  );
};

export default CourseCard;
