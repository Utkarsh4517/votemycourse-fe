import User from "./users";

  interface Course {
    courseId: number;
    courseName: string;
    courseUrl: string;
    courseDescription: string;
    price: number;
    verified: boolean;
    addedBy: User;
    createdAt: string;
  }

  export default Course;
