'use client';


export default function CoursePage({params}: {params: {id: string[]}}) {
  return (
    <div className="bg-white justify-center items-center h-screen">
      <h1>Course Page</h1>
      <p>Course ID: {params.id}</p>
    </div>
  );
}