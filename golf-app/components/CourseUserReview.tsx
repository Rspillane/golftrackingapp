import React from "react";
import { View, Text } from "react-native";

interface CourseUserReviewProps {
  label: string;
  value: any;
  isLast?: boolean;
}

interface ReviewsProps {
  reviewItems: {
    teeboxes: number;
    fairways: number;
    greens: number;
    clubhouse: number;
    facilities: number;
    value: number;
    greenfee: number;
    paceofplay:
      | "1-2 hours"
      | "2-3 hours"
      | "3-4 hours"
      | "4-5 hours"
      | "5+ hours";
  };
}

const CourseUserReview: React.FC<CourseUserReviewProps> = ({
  label,
  value,
  isLast
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
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text style={{ fontSize: 16, color: "#666", fontWeight: "bold" }}>
          {label === "Green Fee" && "$  "}
          {value}
        </Text>
        {label !== "Green Fee" &&
          label !== "Pace of Play" &&
          <Text style={{ fontSize: 12, color: "#666" }}> / 10</Text>}
      </View>
    </View>
  );
};

export default CourseUserReview;
