'use client';
import React from 'react';
import bg from '../assets/votemycourse-bg.png'

export default function LoginHero() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <img 
        src={bg.src} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="bg-black bg-opacity-50 absolute inset-0 z-10"></div>
      <div className="z-20 text-white text-center">
        <h1 className="text-5xl font-bold mb-8">VoteMyCourse</h1>
        <p className="text-xl mb-8">"Think before you pay them"</p>
        <button 
          onClick={handleLogin}
          className="bg-black hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}