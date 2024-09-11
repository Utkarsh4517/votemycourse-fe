"use client";
import { useEffect, useState } from "react";
import { playFairDisplayFont } from "../fonts/fonts";
import User from "../types/users";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EE3617] p-4">
      <div className="bg-white w-full max-w-[1400px] min-h-[400px] md:h-[800px] rounded-[20px] md:rounded-[40px] shadow-lg flex flex-col items-center p-4 md:p-6 space-y-4">
        {user && (
          <div className="text-center space-y-4 text-black w-full">
            <div className="flex justify-center">
              <img
                src={user.profileUrl}
                alt={user.name}
                className="rounded-full w-24 h-24 md:w-36 md:h-36"
              />
            </div>
            <p className="text-base md:text-lg">{user.name}</p>
          </div>
        )}

        <div className="bg-[#EE3617] px-6 md:px-8 py-2 rounded-full hover:bg-white hover:text-[#EE3617] transition-all duration-300 ease-in-out cursor-pointer">
          <div
            className={`${playFairDisplayFont} italic text-white hover:text-[#EE3617] text-sm md:text-base`}
          >
            Add a new course
          </div>
        </div>
      </div>
    </div>
  );
}