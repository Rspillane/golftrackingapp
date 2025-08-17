import React from "react";
import { View, Text, FlatList } from "react-native";

interface MiniReviewCardProps {
  courseName: string;
  courseSubtitle?: string;
  reviewScore?: number;
  userReviewScore?: number;
  reviewDate: string;
  par: number;
  yardage: number;
  holes: number;
  strokes?: number;
}

const MiniReviewCard: React.FC<MiniReviewCardProps> = ({
  courseName,
  courseSubtitle,
  reviewScore,
  userReviewScore,
  reviewDate,
  yardage,
  par,
  holes,
  strokes
}) => {
  return (
    // Should be clickable to navigate to more detailed review page
    <View
      style={{
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 12,
        padding: 16,
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }}
    >
      {/* Course Info */}
      <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <Text style={{ fontWeight: "600", fontSize: 16, color: "#222" }}>
          {courseName}
        </Text>
        {courseSubtitle &&
          <Text style={{ fontSize: 14, color: "#666", fontStyle: "italic" }}>
            "{courseSubtitle}""
          </Text>}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 24,
            width: "100%",
            paddingVertical: 8
          }}
        >
          <Text>
            {yardage} yards
          </Text>
          <Text>
            Par {par}
          </Text>
          <Text>
            {holes} Holes
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              minWidth: 100,
              gap: 24,
              paddingBottom: 4,
              width: "100%"
            }}
          >
            {reviewScore &&
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                ⭐ {reviewScore}
              </Text>}
            {userReviewScore &&
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                🌟 {userReviewScore}
              </Text>}
            {strokes &&
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {strokes} strokes
              </Text>}
          </View>
          <Text style={{ fontSize: 12, color: "#999" }}>
            Rated on the {reviewDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MiniReviewCard;
