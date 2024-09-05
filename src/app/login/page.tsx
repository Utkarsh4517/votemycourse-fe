"use client";
import { vinaSans, playFairDisplay } from "../layout";
import quote from "../../assets/quote.svg";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    console.log("Google credential response:", credentialResponse);
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/google/callback",
        { idToken: credentialResponse.credential },
        { headers: { "Content-Type": "application/json" } }
      );
      const jwtToken = response.data.token;
      localStorage.setItem("token", jwtToken);
      router.push("/home");
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-[#EE3617]">
      <div className="flex-row flex">
        <div className="bg-white w-[600px] h-[650px] rounded-[40px] shadow-lg flex flex-col justify-center space-y-4 ml-24 pl-12">
          <div>
            <img src={quote.src} alt="Quote" />
          </div>
          <div
            className={`text-[#EE3617] italic text-[35px] ${playFairDisplay.className} max-w-md`}
          >
            In a world full of people leaving there 9 to 5 to sell courses to
            young students, it's difficult to find the perfect one.
          </div>
          <div className="h-10"></div>
          <div className="bg-[#EE3617] px-8 py-2 rounded-full ml-48 mr-6">
            <div className={`${playFairDisplay.className} italic text-white`}>
              It’s high time to show’em some levels.....
            </div>
          </div>
        </div>
        <div>
          <div
            className={`text-white text-[180px] ${vinaSans.className} text-center leading-negative ml-32`}
          >
            <span>Vote My</span>
            <br />
            <span>Course</span>
          </div>
          <div className="m-10 ml-64">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Login Failed")}
            />
          </div>
          <div
            className={`bg-white px-8 py-2 rounded-full ${playFairDisplay.className} text-[#EE3617] italic inline-flex ml-64 hover:bg-[#EE3617] hover:text-white transition-all duration-300 ease-in-out`}
          onClick={() => router.push("/onlyfans")}
          >
            continue with onlyfans
          </div>
        </div>
      </div>
    </div>
  );
}
