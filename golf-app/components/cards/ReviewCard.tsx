import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ReviewScore from "../molecules/ReviewScore";
import { useRouter } from "expo-router";
import { theme } from "../../constants/Colors";

export interface ReviewCardProps {
  course: {
    course_id: number;
    course_name: string;
    holes?: number | null;
    par?: number | null;
    length_yards?: number | null;
    tee_details?: any[];
    url?: string;
  };
  reviewScore?: number;
  reviewDate?: string;
  strokes?: number;
  reviewDescription?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  course,
  reviewDescription,
  reviewDate,
  strokes
}) => {
  const router = useRouter();

  const handlePress = () => {
    {
      router.push(`/course/${course.course_id}`);
    }
  };
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View
        style={{
          borderRadius: 12,
          padding: 16,
          backgroundColor: theme.colors.lightBgLight,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2
        }}
      >
        {/* Course Info */}
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            alignItems: "flex-start"
          }}
        >
          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Text style={{ fontWeight: "600", fontSize: 16, color: "#222" }}>
              {course.course_name}
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 12,
                color: "#666",
                paddingBottom: 8
              }}
            >
              Course location
            </Text>
            <Text>
              {reviewDescription ? reviewDescription : "Review Description"}
            </Text>
            {reviewDate &&
              <Text
                style={{
                  paddingTop: 12,
                  fontSize: 14,
                  color: "#666",
                  fontStyle: "italic"
                }}
              >
                {strokes
                  ? `Shot ${strokes} on ${reviewDate}`
                  : `Rated on ${reviewDate}`}
              </Text>}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 24,
              paddingVertical: 4
            }}
          >
            <Text style={{ fontSize: 18 }}>⭐️ ⭐️ ⭐️ ⭐️ ⭐️</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReviewCard;
