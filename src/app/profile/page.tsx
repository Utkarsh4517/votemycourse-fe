import { playFairDisplayFont } from "../fonts/fonts";
export default function Profile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EE3617]">
      <div className="bg-white w-full max-w-[1400px] h-[800px] rounded-[40px] shadow-lg flex flex-col items-center p-6 space-y-4">
      <div
          className="bg-[#EE3617] px-8 py-2 rounded-full hover:bg-white hover:text-[#EE3617] transition-all duration-300 ease-in-out"
        //   onClick={}
        >
          <div
            className={`${playFairDisplayFont} italic text-white hover:text-[#EE3617]`}
          >
            add a new course 
          </div>
        </div>
      </div>
    </div>
  );
}
