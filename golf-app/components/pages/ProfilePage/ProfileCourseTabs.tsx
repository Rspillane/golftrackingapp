import React from "react";
import { View, Text } from "react-native";
import Tabs from "../../templates/Tabs";
import MiniReviewCard from "../../cards/ReviewCard";

import reviewData from "../../../assets/data/reviewData";
import { theme } from "../../../constants/Colors";


interface ProfileCourseTabsProps {

}

const ProfileCourseTabs: React.FC<ProfileCourseTabsProps> = ({

}) => {
  const [activeTab, setActiveTab] = React.useState<
    "Top Courses" | "Recent" | "Saved"
  >("Top Courses");

  return (
    <>
    <View style={{
      marginBottom: 12, 
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12, 
      backgroundColor: theme.colors.lightBgLight, 
      paddingInline: 16}
    }>
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { key: "Top Courses", label: "Top Courses" },
          { key: "Recent", label: "Recent" },
          { key: "Saved", label: "Saved" }
        ]}
      />
    </View>
      <View style={{backgroundColor: theme.colors.lightBgDark, paddingHorizontal: 16, marginTop: -28, paddingTop: 24, zIndex:-1}}>
      {activeTab === "Top Courses" &&
        <View style={{ gap: 8 }}>
          {reviewData.map((review, index) => (
            <MiniReviewCard
              key={index}
              course={{
                // course_id: review.courseId,
                course_name: review.courseName,
                // courseSubtitle: review.courseSubtitle,
                par: review.par,
                length_yards: review.yardage,
                holes: review.holes
              }}
              course_name={review.courseName}
              courseSubtitle={review.courseSubtitle}
              reviewScore={review.reviewScore}
              userReviewScore={review.userReviewScore}
              reviewDate={review.reviewDate}
              par={review.par}
              yardage={review.yardage}
              holes={review.holes}
              strokes={review.strokes}
              />
          ))}
        </View>}
      {activeTab === "Recent" &&
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Course Reviews
          </Text>
          {/* Placeholder for course reviews content */}
        </View>}
      {activeTab === "Saved" &&
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Bucket List
          </Text>
          {/* Placeholder for bucket list content */}
        </View>}
        </View>
    </>
  );
};

export default ProfileCourseTabs;
