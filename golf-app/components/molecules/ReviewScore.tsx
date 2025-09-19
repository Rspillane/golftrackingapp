import React from "react";
import { View, Text, Image } from "react-native";

interface ReviewScoreProps {
  reviewScore?: number;
  fallbackText?: string;
}

const ReviewScore: React.FC<ReviewScoreProps> = ({
  reviewScore,
  fallbackText = "3.8"
}) => {
  // If both scores are provided, prioritize reviewScore
  if (reviewScore) {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          gap: 4
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: "#666",
            fontWeight: "600"
          }}
        >
          {reviewScore || fallbackText}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/icons/star.svg")}
            style={{ width: 18, height: 18 }}
            resizeMode="contain"
          />
          <Image
            source={require("../../assets/icons/star.svg")}
            style={{ width: 18, height: 18 }}
            resizeMode="contain"
          />
          <Image
            source={require("../../assets/icons/star.svg")}
            style={{ width: 18, height: 18 }}
            resizeMode="contain"
          />
          <Image
            source={require("../../assets/icons/star.svg")}
            style={{ width: 18, height: 18 }}
            resizeMode="contain"
          />
          <Image
            source={require("../../assets/icons/star.svg")}
            style={{ width: 18, height: 18 }}
            resizeMode="contain"
          />
        </View>

        <Text
          style={{
            fontSize: 10,
            color: "#666",
            fontWeight: "400"
          }}
        >
          (100 reviews)
        </Text>
      </View>
    );
  }
};

export default ReviewScore;
