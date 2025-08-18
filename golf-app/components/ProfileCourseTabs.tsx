import React from "react";
import { View, Text, Image } from "react-native";
import Tabs from "../components/Tabs";
import MiniReviewCard from "./MiniReviewCard";

import reviewData from "../assets/data/reviewData";

interface ProfileCourseTabsProps {

}

const ProfileCourseTabs: React.FC<ProfileCourseTabsProps> = ({

}) => {
  const [activeTab, setActiveTab] = React.useState<
    "Top Courses" | "Course Reviews" | "Bucket List"
  >("Top Courses");

  return (
    <>
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { key: "Top Courses", label: "Top Courses" },
          { key: "Course Reviews", label: "Reviews" },
          { key: "Bucket List", label: "Bucket List" }
        ]}
      />
      {activeTab === "Top Courses" &&
        <View style={{ gap: 8 }}>
          {reviewData.map((review, index) => (
            <MiniReviewCard
              key={index}
              courseName={review.courseName}
              courseSubtitle={review.courseSubtitle}
              reviewScore={review.reviewScore}
              userReviewScore={review.userReviewScore}
              reviewDate={review.reviewDate}
              par={review.par}
              yardage={review.yardage}
              holes={review.holes}
              />
          ))}
        </View>}
      {activeTab === "Course Reviews" &&
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Course Reviews
          </Text>
          {/* Placeholder for course reviews content */}
        </View>}
      {activeTab === "Bucket List" &&
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Bucket List
          </Text>
          {/* Placeholder for bucket list content */}
        </View>}
    </>
  );
};

export default ProfileCourseTabs;
