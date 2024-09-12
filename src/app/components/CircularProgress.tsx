import React from 'react';
import '../CircularProgress.css';

const CircularProgress = () => {
  return (
    <div className="spinner center">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className={`spinner-blade blade-${index + 1}`}></div>
      ))}
    </div>
  );
};

export default CircularProgress;
