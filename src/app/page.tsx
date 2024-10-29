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
      // Start text fade first
      setTimeout(() => {
        setIsTextFading(true);
        
        // Start portal after text fades
        setTimeout(() => {
          setIsPortalActive(true);
          
          // Redirect after portal animation
          setTimeout(() => {
            router.push("/login");
          }, 2800);
        }, 800); // Start portal after text is mostly faded
      }, 1000);
    }
  }, [router]);

  return (
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden
      ${isPortalActive ? 'animate-bg' : 'bg-white'}`}>
      
      {/* Dynamic background gradients */}
      <div 
        className={`absolute inset-0 bg-gradient-radial from-white via-red-50 to-red-100
          ${isPortalActive ? 'animate-gradient' : 'opacity-0'}`}
      />
      
      {/* Portal effects container */}
      {isPortalActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Morphing shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 animate-morph-1 opacity-30">
              <div className="absolute inset-[20%] bg-gradient-to-r from-red-300 via-red-500 to-red-300 rounded-full blur-xl" />
            </div>
            <div className="absolute inset-0 animate-morph-2 opacity-20">
              <div className="absolute inset-[25%] bg-gradient-to-r from-orange-300 via-red-400 to-orange-300 rounded-full blur-xl" />
            </div>
          </div>

          {/* Portal rings with enhanced gradients */}
          <div className="relative w-96 h-96 animate-portal">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ring"
                style={{
                  width: `${(i + 1) * 50}px`,
                  height: `${(i + 1) * 50}px`,
                  animationDelay: `${i * 0.15}s`,
                  background: `linear-gradient(${i * 36}deg, 
                    rgba(239, ${54 + (i * 8)}, ${23 + (i * 8)}, ${0.9 - i * 0.08}),
                    rgba(255, ${100 + (i * 8)}, ${50 + (i * 8)}, ${0.8 - i * 0.08}),
                    rgba(239, ${54 + (i * 8)}, ${23 + (i * 8)}, ${0.9 - i * 0.08}))`,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              />
            ))}

            {/* Enhanced center vortex */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 animate-vortex">
              <div className="absolute inset-0 rounded-full bg-gradient-conic from-red-600 via-orange-500 to-red-600" />
              <div className="absolute inset-[10%] rounded-full bg-gradient-radial from-red-900 via-black to-black opacity-90" />
              <div className="absolute inset-[20%] rounded-full animate-pulse-glow">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-400 to-red-500 rounded-full blur-md" />
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
          Let's enter the world of real education!
        </h1>
      </div>

      <style jsx>{`
        @keyframes morph-1 {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.1); }
          50% { transform: rotate(180deg) scale(0.9); }
          75% { transform: rotate(270deg) scale(1.2); }
        }

        @keyframes morph-2 {
          0%, 100% { transform: rotate(0deg) scale(1.2); }
          25% { transform: rotate(-90deg) scale(0.9); }
          50% { transform: rotate(-180deg) scale(1.1); }
          75% { transform: rotate(-270deg) scale(1); }
        }

        @keyframes portal {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          100% { transform: scale(1) rotate(360deg); opacity: 1; }
        }

        @keyframes ring {
          0% { 
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0;
          }
          50% { opacity: 0.8; }
          100% { 
            transform: translate(-50%, -50%) scale(2) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes vortex {
          0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); }
          100% { transform: translate(-50%, -50%) scale(4) rotate(720deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }

        @keyframes text-fade {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.9); }
        }

        @keyframes gradient {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes bgTransition {
          0% { background-color: white; }
          100% { background-color: #fff5f5; }
        }

        .animate-morph-1 {
          animation: morph-1 8s infinite;
        }

        .animate-morph-2 {
          animation: morph-2 8s infinite;
        }

        .animate-portal {
          animation: portal 2.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-ring {
          animation: ring 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-vortex {
          animation: vortex 2.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-text-fade {
          animation: text-fade 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-gradient {
          animation: gradient 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-bg {
          animation: bgTransition 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default PortalSplashScreen;