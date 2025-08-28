import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CourseReview {
  [topic: string]: number; // e.g., "teeboxes": 9
}

export interface UserReviews {
  [courseId: string]: CourseReview;
}

interface UserReviewsContextType {
  reviews: UserReviews;
  addOrUpdateReview: (courseId: string, review: CourseReview) => void;
  getReview: (courseId: string) => CourseReview | undefined;
}

const UserReviewsContext = createContext<UserReviewsContextType | undefined>(
  undefined
);

export const UserReviewsProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<UserReviews>({});

  const addOrUpdateReview = (courseId: string, review: CourseReview) => {
    setReviews(prev => ({
      ...prev,
      [courseId]: { ...prev[courseId], ...review }
    }));
  };

  const getReview = (courseId: string) => {
    return reviews[courseId];
  };

  return (
    <UserReviewsContext.Provider
      value={{ reviews, addOrUpdateReview, getReview }}
    >
      {children}
    </UserReviewsContext.Provider>
  );
};

export const useUserReviews = () => {
  const context = useContext(UserReviewsContext);
  if (!context)
    throw new Error("useUserReviews must be used within a UserReviewsProvider");
  return context;
};
