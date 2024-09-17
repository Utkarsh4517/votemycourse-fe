"use client";
import quote from "../../assets/quote.svg";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { playFairDisplayFont, vinaSansFont, sahityaFont } from "../fonts/fonts";
import Image from "next/image";
import AuthResponse from "../types/authResponse";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

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
      console.log("Token:", token);
      console.log("User:", user);

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/home");
    } catch (error) {
      console.error("Error during authentication:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center bg-[#EE3617] p-4 lg:p-0">
      <div className="w-full lg:w-auto lg:flex-1 flex flex-col lg:flex-row items-center lg:items-stretch lg:ml-24">
        <div className="bg-white w-full lg:w-[600px] h-auto lg:h-[650px] rounded-[40px] shadow-lg flex flex-col justify-center space-y-4 p-8 lg:p-12 mb-8 lg:mb-0">
          <div>
            <Image src={quote.src} alt="Quote" width={100} height={100} />
          </div>
          <div
            className={`text-[#EE3617] italic text-2xl lg:text-[35px] ${playFairDisplayFont} max-w-md`}
          >
            In a world full of people leaving 9 to 5 to sell courses to young
            students, it&apos;s difficult to find the perfect one.
          </div>
          <div className="h-10"></div>
          <div className="bg-[#EE3617] px-4 lg:px-8 py-2 rounded-full self-end lg:ml-48 lg:mr-6 mt-4 lg:mt-0">
            <div className={`${playFairDisplayFont} italic text-white text-sm lg:text-base`}>
              It&apos;s high time to show&apos;em some levels.....
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-auto lg:flex-1 flex flex-col items-center lg:items-start lg:ml-32">
        <div
          className={`text-white text-6xl lg:text-[180px] ${vinaSansFont} text-center leading-negative mb-8 lg:mb-0`}
        >
          <span>Vote My</span>
          <br />
          <span>Course</span>
        </div>
        <div className="flex flex-col items-center lg:items-start space-y-4 mt-8 lg:mt-10 lg:ml-32">
          <GoogleLogin
            shape="circle"
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Login Failed")}
          />
          <button
            className={`bg-white px-6 py-2 rounded-full ${sahityaFont} text-[#EE3617] italic hover:bg-[#EE3617] hover:text-white transition-all duration-300 ease-in-out hover:border-white border`}
            onClick={() => router.push("/onlyfans")}
          >
            continue with onlyfans
          </button>
        </div>
      </div>
    </div>
  );
}