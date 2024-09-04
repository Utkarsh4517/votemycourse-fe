'use client';
import React, { useState } from 'react';
import bg from '../assets/votemycourse-bg.png'
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';


export default function LoginHero() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [secureData, setSecureData] = useState<string | null>(null);
  const handleGoogleSuccess = async (credentialResponse: any) => {
    console.log('Google credential response:', credentialResponse);
    try {
      const response = await axios.post('http://localhost:8080/auth/google/callback', 
        { idToken: credentialResponse.credential },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Backend response:', response.data);
      const jwtToken = response.data.token;
      localStorage.setItem('token', jwtToken);
      router.push('/home');
      setToken(jwtToken);
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  const fetchSecureData = async () => {
    if (!token) return;
    try {
      const response = await axios.get('http://localhost:8080/api/courses/id/10', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Secure data response:', response.data);
      setSecureData(response.data);
    } catch (error) {
      console.error('Error fetching secure data:', error);
    }
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
        {!token && (
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log('Login Failed')}
        />
      )}
      {token && (
        <div className="mt-8">
          <p className="mb-4">JWT Token: {token.substring(0, 20)}...</p>
          <button
            onClick={fetchSecureData}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Fetch Secure Data
          </button>
          {secureData && <p className="mt-16">Secure Data: {secureData}</p>}
        </div>
      )}
      </div>
    </div>
  );
}