"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PortalSplashScreen = () => {
  const router = useRouter();
  const [isTextFading, setIsTextFading] = useState(false);
  const [isPortalActive, setIsPortalActive] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/home");
    } else {
      setTimeout(() => {
        setIsTextFading(true);
        setTimeout(() => {
          setIsPortalActive(true);
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        }, 400);
      }, 800);
    }
  }, [router]);

  return (
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden
      ${isPortalActive ? 'animate-bg' : 'bg-white'}`}>
      
      {/* Subtle background gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-radial from-white via-red-50/30 to-red-100/20
          ${isPortalActive ? 'animate-gradient' : 'opacity-0'}`}
      />
      
      {/* Portal effects */}
      {isPortalActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Ambient light effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 animate-ambient opacity-20">
              <div className="absolute inset-[30%] bg-gradient-to-r from-red-200/50 via-orange-200/50 to-red-200/50 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Portal rings */}
          <div className="relative w-96 h-96 animate-portal">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ring"
                style={{
                  width: `${(i + 1) * 50}px`,
                  height: `${(i + 1) * 50}px`,
                  animationDelay: `${i * 0.08}s`,
                  background: `linear-gradient(${i * 45}deg, 
                    rgba(255, ${140 + (i * 10)}, ${120 + (i * 10)}, ${0.7 - i * 0.08}),
                    rgba(255, ${160 + (i * 10)}, ${140 + (i * 10)}, ${0.6 - i * 0.08}))`,
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 0 15px rgba(255, 100, 100, 0.1)',
                }}
              />
            ))}

            {/* Portal core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 animate-vortex">
              <div className="absolute inset-0 rounded-full bg-gradient-conic from-red-300 via-orange-200 to-red-300" />
              <div className="absolute inset-[15%] rounded-full bg-gradient-radial from-white via-red-50 to-red-100 opacity-90" />
              <div className="absolute inset-[25%] rounded-full animate-pulse-glow">
                <div className="absolute inset-0 bg-gradient-to-r from-white via-red-100 to-white rounded-full blur-sm" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Text content */}
      <div className="relative z-10">
        <h1 
          className={`text-red-500 text-5xl md:text-7xl font-extrabold text-center leading-tight
            ${isTextFading ? 'animate-text-fade' : ''}`}
        >
          Let's break the convention!
        </h1>
      </div>

      <style jsx>{`
        @keyframes ambient {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }

        @keyframes portal {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          100% { transform: scale(1) rotate(180deg); opacity: 1; }
        }

        @keyframes ring {
          0% { 
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0;
          }
          50% { opacity: 0.7; }
          100% { 
            transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
            opacity: 0;
          }
        }

        @keyframes vortex {
          0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); }
          100% { transform: translate(-50%, -50%) scale(3) rotate(360deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.1); }
        }

        @keyframes text-fade {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.95); }
        }

        @keyframes gradient {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .animate-portal {
          animation: portal 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-ring {
          animation: ring 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-vortex {
          animation: vortex 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-ambient {
          animation: ambient 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }

        .animate-text-fade {
          animation: text-fade 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-gradient {
          animation: gradient 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default PortalSplashScreen;