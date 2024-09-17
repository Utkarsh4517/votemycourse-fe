import Course from "./course";
import User from "./users";

export interface Review {
    comment: string;
    course: Course;
    createdAt: string;
    recommended: boolean;
    reviewId: 1;
    rating: number;
    user: User;
}
