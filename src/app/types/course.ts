import User from "./users";

  interface Course {
    courseId: number;
    courseName: string;
    courseUrl: string;
    courseThumbnailUrl: string;
    courseDescription: string;
    price: number;
    verified: boolean;
    addedBy: User;
    createdAt: string;
    authorName: string;
    recommendationPercentage: number;
    upvotes: number;
    downvotes: number;
  }

  export default Course;
