"use client";
import quote from "../../assets/quote.svg";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { playFairDisplayFont, vinaSansFont, sahityaFont } from "../fonts/fonts";
import Image from "next/image";
import AuthResponse from "../types/authResponse";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/home");
    }
  }, []);
  
  const baseUrl = "https://api.votemycourse.com";

  const handleGoogleSuccess = async (credentialResponse: any) => {
    console.log("Google credential response:", credentialResponse);
    try {
      console.log("Base url is ", baseUrl);
      console.log("Exchanging code for token...");
      const response = await axios.post<AuthResponse>(
        `${baseUrl}/auth/google/callback`,
        { idToken: credentialResponse.credential },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Auth response:", response.data);

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/home");
    } catch (error) {
      console.error("Error during authentication:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 20 - 10,
      y: (e.clientY / window.innerHeight) * 20 - 10,
    });
  };

  return (
    <div 
      className="min-h-screen flex flex-col lg:flex-row items-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: "linear-gradient(120deg, #ff4b4b, #ff8080, #ff4b4b)",
        backgroundSize: "200% 200%",
        animation: "gradientShift 15s ease infinite"
      }}
    >
      {/* Animated background bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-float"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end p-8 lg:pr-16 relative z-10">
        <div 
          className="bg-white/95 backdrop-blur-sm w-full lg:w-[600px] rounded-3xl shadow-2xl 
                    transform transition-all duration-500 hover:scale-[1.02] hover:shadow-red-400/30
                    p-8 lg:p-12 space-y-6"
          style={{
            transform: isHovering ? 
              `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)` : 
              'none'
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative animate-bounce-slow">
            <Image 
              src={quote.src} 
              alt="Quote" 
              width={80} 
              height={80}
              className="opacity-80 hover:opacity-100 transition-opacity duration-300 transform hover:rotate-12"
            />
          </div>
          
          <div className={`text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400
                          italic text-2xl lg:text-[35px] ${playFairDisplayFont} max-w-md
                          transform transition-all duration-500 hover:scale-105
                          animate-pulse-slow`}>
            In a world full of people leaving 9 to 5 to sell courses to young students, 
            it&apos;s difficult to find the perfect one.
          </div>
          
          <div className="h-10"></div>
          
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 rounded-full 
                        self-end lg:ml-48 lg:mr-6 shadow-lg hover:shadow-red-400/50
                        transform transition-all duration-300 hover:translate-x-2 hover:rotate-2">
            <div className={`${playFairDisplayFont} italic text-white/90 text-sm lg:text-base`}>
              It&apos;s high time to show&apos;em some levels.....
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start p-8 lg:pl-16 relative z-10">
        <div 
          className={`text-transparent bg-clip-text bg-gradient-to-br from-white to-red-100
                    text-6xl lg:text-[160px] ${vinaSansFont} text-center leading-none
                    transform transition-all duration-500 hover:scale-105
                    animate-text-shadow`}
        >
          <span className="block hover:animate-wiggle">Vote My</span>
          <span className="block hover:animate-wiggle">Course</span>
        </div>

        <div className="flex flex-col items-center lg:items-start space-y-6 mt-12">
          <div className="transform transition-all duration-300 hover:scale-110 hover:rotate-3">
            <GoogleLogin
              shape="circle"
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Login Failed")}
            />
          </div>
          
          <button
            className={`bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full 
                      ${sahityaFont} text-white border-2 border-white/30
                      hover:bg-white hover:text-red-500 
                      transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                      hover:shadow-white/20 hover:rotate-2
                      animate-pulse-subtle`}
            onClick={() => router.push("/onlyfans")}
          >
            continue with onlyfans
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }

        @keyframes textShadow {
          0% { text-shadow: 0 0 10px rgba(255,255,255,0.5); }
          50% { text-shadow: 0 0 20px rgba(255,255,255,0.8); }
          100% { text-shadow: 0 0 10px rgba(255,255,255,0.5); }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-text-shadow {
          animation: textShadow 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-wiggle {
          transition: transform 0.3s ease;
        }

        .animate-wiggle:hover {
          animation: wiggle 0.5s ease-in-out;
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
      `}</style>
    </div>
  );
}