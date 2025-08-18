import React from "react";
import { View, Text } from "react-native";

interface ReviewScoreProps {
  reviewScore?: number | string;
  userReviewScore?: number | string;
  fallbackText?: string;
}

const ReviewScore: React.FC<ReviewScoreProps> = ({
  reviewScore,
  userReviewScore,
  fallbackText = "insufficient data"
}) => {
  // If both scores are provided, prioritize userReviewScore
  if (userReviewScore) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: 50,
          gap: 4
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#666",
            fontWeight: "600"
          }}
        >
          {userReviewScore}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "blue",
            fontWeight: "600"
          }}
        >
          ★
        </Text>
      </View>
    );
  }

  // If only reviewScore is provided
  if (reviewScore) {
    return (
      <Text
        style={{
          fontSize: 16,
          color: "#666",
          fontWeight: "600",
          width: 50
        }}
      >
        {reviewScore || fallbackText} ⭐️
      </Text>
    );
  }

  // If neither score is provided, return null (nothing rendered)
  return null;
};

export default ReviewScore;
