import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ReviewScore from "../molecules/ReviewScore";
import { useRouter } from "expo-router";
import { theme } from "../../constants/Colors";

export interface CourseCardProps {
  course: {
    course_id: number;
    county?: string;
    region?: string;
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

const CourseCard: React.FC<CourseCardProps> = ({ course, reviewScore }) => {
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
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          width: "100%"
        }}
      >
        {/* Course Info */}
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            display: "flex",
            width: "50%",
            flexGrow: 1
          }}
        >
          <View style={{ flexDirection: "column", paddingBottom: 4 }}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 14,
                color: "#222",
                textOverflow: "ellipsis",
                overflow: "hidden"
              }}
            >
              {course.course_name}
            </Text>
            <Text style={{ fontWeight: "400", fontSize: 12, color: "#666" }}>
              {course.county}, {course.region}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              width: "100%"
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Image
                source={require("../../assets/icons/length.svg")}
                style={{ width: 18, height: 18 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 10 }}>
                {course.length_yards
                  ? `${course.length_yards} yards`
                  : "Yardage N/A"}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Image
                source={require("../../assets/icons/golf-flag.svg")}
                style={{ width: 18, height: 18 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 10 }}>
                Par {course.par || "?"}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Image
                source={require("../../assets/icons/leaderboard.svg")}
                style={{ width: 18, height: 18 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 10 }}>
                {course.slope && course.rating
                  ? `${course.slope}/ ${course.rating}`
                  : "71/120"}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <ReviewScore reviewScore={reviewScore || 0} />
          </View>
        </View>
        <ReviewScore reviewScore={reviewScore || 1} />
      </View>
    </TouchableOpacity>
  );
};

export default CourseCard;
