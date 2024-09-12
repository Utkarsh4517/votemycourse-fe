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
    authorName: string;
  }

  export default Course;
