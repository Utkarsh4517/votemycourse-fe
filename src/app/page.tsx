'use client';
import { useRouter } from "next/navigation";
import { playFairDisplayFont, vinaSansFont } from "./fonts/fonts";
import axios from "axios";
import { baseUrl } from "./constants/exports";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EE3617]">
      <div className="bg-white w-[1100px] h-[650px] rounded-[40px] shadow-lg flex flex-col items-center justify-center space-y-4">
        <div
          className={`text-[#EE3617] italic text-[30px] ${playFairDisplayFont} text-center`}
        >
          Think before you pay them.
        </div>

        <div
          className={`text-[#EE3617] text-[180px] ${vinaSansFont} text-center leading-negative`}
        >
          <span>Vote My</span>
          <br />
          <span>Course</span>
        </div>
        <div className="h-8"></div>
        <div
          className="bg-[#EE3617] px-8 py-2 rounded-full hover:bg-white hover:text-[#EE3617] transition-all duration-300 ease-in-out"
          onClick={async () => {
            const response = await axios.get(`${baseUrl}`, {
            });
            console.log('Response:', response);
          }}
        >
          <div
            className={`${playFairDisplayFont} italic text-white hover:text-[#EE3617]`}
          >
            get started
          </div>
        </div>
      </div>
    </div>
  );
}
