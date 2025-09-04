import React, { useState } from "react";
import { View, Text } from "react-native";
import Tabs from "../templates/Tabs"
import CourseInfoItem from "./CourseInfoItem"

interface ReviewItem {
  label: string;
  score: number;
}

interface CourseDetailSectionProps {
  course: any;
  reviewItems: ReviewItem[];
  userReviews: Record<string, number>;
}

const CourseDetailSection: React.FC<CourseDetailSectionProps> = ({
  course,
  reviewItems,
  userReviews,
}) => {
  const [activeTab, setActiveTab] = useState<"info" | "ratings">("info");

  return (
    <View>
      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { key: "info", label: "Course Info" },
          { key: "ratings", label: "Player Ratings" },
        ]}
      />

      {/* Ratings Tab */}
      {activeTab === "ratings" && (
        <View
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: 8,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          {reviewItems.map((item, index) => (
            <View
              key={item.label}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15,
                borderBottomWidth: index === reviewItems.length - 1 ? 0 : 1,
                borderBottomColor: "#e0e0e0",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.label}</Text>
              <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 24 }}>
                {/* Average Score */}
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  ⭐️ {item.score.toFixed(1)}
                </Text>

                {/* User Score */}
                <Text style={{ fontSize: 16, fontWeight: "500", color: "blue" }}>
                  ★ {userReviews[item.label] ?? "      "}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Info Tab */}
      {activeTab === "info" && (
        <View
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: 8,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          {[
            { label: "Address", value: `${course.address}` },
            { label: "Course Par", value: course.par ? `${course.par}` : "Unknown" },
            { label: "Holes", value: course.holes ? `${course.holes} Holes` : "Unknown" },
            { label: "Yardage", value: course.length_yards ? `${course.length_yards} yards` : "Unknown" },
            course.website
              ? { label: "Website", value: "Visit →", isLink: true, onPress: null }
              : null,
            course.practice?.driving_range
              ? { label: "Driving Range", value: "Available" }
              : null,
            course.practice?.putting_green
              ? { label: "Putting Green", value: "Available" }
              : null,
            course.rentals?.rental_carts
              ? { label: "Rental Carts", value: "Available" }
              : null,
            course.rentals?.rental_clubs
              ? { label: "Rental Clubs", value: "Available" }
              : null,
          ]
            .filter(Boolean)
            .map((item, index, arr) => (
              <CourseInfoItem
                key={item!.label}
                label={item!.label}
                value={item!.value}
                isLink={item!.isLink}
                // onPress={item!.onPress}
                isLast={index === arr.length - 1}
              />
            ))}
        </View>
      )}
    </View>
  );
};

export default CourseDetailSection;
