"use client";
import { useRouter } from "next/navigation";
import { playFairDisplayFont, vinaSansFont } from "./fonts/fonts";
import { useEffect } from "react";
import CarbonDirectLink from "./components/Carbon";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => { 
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/home");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EE3617] p-4">
      <div className="bg-white w-full max-w-[1100px] min-h-[650px] rounded-[40px] shadow-lg flex flex-col items-center justify-center space-y-4 p-8">
        <div
          className={`text-[#EE3617] italic text-2xl sm:text-3xl md:text-[30px] ${playFairDisplayFont} text-center`}
        >
          Think before you pay them.
        </div>

        <div
          className={`text-[#EE3617] text-7xl sm:text-8xl md:text-9xl lg:text-[180px] ${vinaSansFont} text-center leading-none`}
        >
          <span>Vote My</span>
          <br />
          <span>Course</span>
        </div>
        <CarbonDirectLink siteId="351360" />
        <div className="h-4 sm:h-6 md:h-8"></div>
        <button
          className="bg-[#EE3617] px-6 sm:px-8 py-2 rounded-full hover:bg-white hover:text-[#EE3617] transition-all duration-300 ease-in-out border hover:border-[#EE3617]"
          onClick={() => router.push("/login")}
        >
          <div
            className={`${playFairDisplayFont} italic text-white hover:text-[#EE3617] text-lg sm:text-xl`}
          >
            get started
          </div>
        </button>
      </div>
    </div>
  );
}