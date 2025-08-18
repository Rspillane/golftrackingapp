import React from "react";
import { View, Text } from "react-native";

interface CourseUserReviewProps {
  label: string;
  score: number;
  userScore?: number;
  isLast?: boolean;
}

const CourseUserReview: React.FC<CourseUserReviewProps> = ({
  label,
  score,
  isLast,
  userScore
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: "#e0e0e0"
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "500" }}>
        {label}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 24 }}>
        <Text style={{ fontSize: 16, color: "#666", fontWeight: "600" }}>
          {score ? score : "insufficient data"} ⭐️
        </Text>
        {userScore
          ? <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text style={{ fontSize: 16, color: "#666", fontWeight: "600" }}>
                {userScore}
              </Text>
              <Text style={{ fontSize: 16, color: "blue", fontWeight: "600" }}>
                {`★`}
              </Text>
            </View>
          : <Text style={{ fontSize: 16, color: "#666", fontWeight: "600" }}>
              {`★`}
            </Text>}
      </View>
    </View>
  );
};

export default CourseUserReview;
