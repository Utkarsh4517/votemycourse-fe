
export default function PrimaryButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className=" bg-[#EE3617] text-white rounded-full p-3 font-semibold focus:outline-none focus:ring-2 focus:ring-[#EE3617]"
    >
      {children}
    </button>
  );
}