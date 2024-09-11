"use client";
import quote from "../../assets/quote.svg";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { playFairDisplayFont, vinaSansFont } from "../fonts/fonts";
import Image from "next/image";
import AuthResponse from "../types/authResponse";



export default function LoginPage() {
  const router = useRouter();
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
  
      // You might want to set the user in your app's state as well, e.g., using React Context or Redux
      // setUser(user);
  
      router.push("/home");
    } catch (error) {
      console.error("Error during authentication:", error);
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
            <Image src={quote.src} alt="Quote"  width={100} height={100}/>
          </div>
          <div
            className={`text-[#EE3617] italic text-[35px] ${playFairDisplayFont} max-w-md`}
          >
            In a world full of people leaving 9 to 5 to sell courses to
            young students, it&apos;s difficult to find the perfect one.
          </div>
          <div className="h-10"></div>
          <div className="bg-[#EE3617] px-8 py-2 rounded-full ml-48 mr-6">
            <div className={`${playFairDisplayFont} italic text-white`}>
              It&apos;s high time to show&apos;em some levels.....
            </div>
          </div>
        </div>
        <div>
          <div
            className={`text-white text-[180px] ${vinaSansFont} text-center leading-negative ml-32`}
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
            className={`bg-white px-8 py-2 rounded-full ${playFairDisplayFont} text-[#EE3617] italic inline-flex ml-64 hover:bg-[#EE3617] hover:text-white transition-all duration-300 ease-in-out`}
          onClick={() => router.push("/onlyfans")}
          >
            continue with onlyfans
          </div>
        </div>
      </div>
    </div>
  );
}
