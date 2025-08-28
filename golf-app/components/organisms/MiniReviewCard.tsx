import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ReviewScore from "../molecules/ReviewScore";
import { useRouter } from "expo-router";

export interface MiniReviewCardProps {
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
  userReviewScore?: number;
  reviewDate?: string;
  strokes?: number;
}

const MiniReviewCard: React.FC<MiniReviewCardProps> = ({
  course,
  reviewScore,
  userReviewScore,
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
          borderWidth: 1,
          borderColor: "#e0e0e0",
          borderRadius: 12,
          padding: 16,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2
        }}
      >
        {/* Course Info */}
        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Text style={{ fontWeight: "600", fontSize: 16, color: "#222" }}>
            {course.course_name}
          </Text>
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
              {course.length_yards
                ? `${course.length_yards} yards`
                : "Yardage N/A"}
            </Text>
            <Text>
              Par {course.par || "?"}
            </Text>
            <Text>
              {course.holes ? `${course.holes} Holes` : "Holes N/A"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              minWidth: 100,
              gap: 24,
              width: "100%",
              paddingVertical: 4
            }}
          >
            <ReviewScore reviewScore={reviewScore || 0} />
            <ReviewScore userReviewScore={userReviewScore || 0} />
          </View>
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
      </View>
    </TouchableOpacity>
  );
};

export default MiniReviewCard;
