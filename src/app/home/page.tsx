'use client';
import React, { useEffect } from 'react';

function Home() {

    useEffect(() => {
        // Extract token from query parameter
        const token = new URLSearchParams(window.location.search).get('token');
        
        if (token) {
          localStorage.setItem('jwtToken', token);
          console.log('Token extracted and stored in local storage');
          console.log(token)
        }
      },);


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>VoteMyCourse.com</h1>
    </div>
  );
}

export default Home;