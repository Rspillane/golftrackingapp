import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ReviewScore from "./ReviewScore";

interface CourseUserReviewProps {
  label: string;
  score: number;
  userScore?: number;
  isLast?: boolean;
  onPress?: () => void;
}

const CourseUserReview: React.FC<CourseUserReviewProps> = ({
  label,
  score,
  isLast,
  userScore,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: "#e0e0e0"
      }}
      onPress={() => {
        onPress;
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "500" }}>
        {label}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 24 }}>
        <ReviewScore reviewScore={score} />
        <ReviewScore userReviewScore={userScore} />
      </View>
    </TouchableOpacity>
  );
};

export default CourseUserReview;
