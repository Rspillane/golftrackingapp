import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or react-native-vector-icons
import { LinearGradient } from 'expo-linear-gradient';

interface CourseHeaderProps {
  title: string;
  score?: number;
  numOfReviews?: number;
  onReviewPress?: () => void;
  onBucketListPress?: () => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  title,
  score,
  numOfReviews,
  onReviewPress,
  onBucketListPress,
}) => {
  const hasReviewed = score !== undefined && score > 0;

  // Track saved/bookmarked state
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkPress = () => {
    setIsBookmarked(!isBookmarked);
    onBucketListPress?.();
  };

  return (
    <>
      {/* Course Image */}
      <View
        style={{
          width: "100%",
          height: 200,
          backgroundColor: "#e0e0e0",
          borderRadius: 12,
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#999", fontSize: 16 }}>No Image Available</Text>
              <LinearGradient
        colors={["transparent", ""]}
        style={styles.gradient}
      />
      </View>

      {/* Course Title */}
      <View style={{ marginBottom: 4 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>
          {title}
        </Text>
      </View>

      {/* Action Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingTop: 15,
          paddingBottom: 20,
          gap: 16,
          alignItems: "flex-start",
        }}
      >
        {/* Review Score */}
        <View style={{ alignItems: "center", minWidth: 100 }}>
          <Text style={{ fontSize: 24, marginBottom: 8 }}>⭐</Text>

          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>{score}</Text>
            <Text style={{ fontSize: 12, color: "#666" }}> / 5</Text>
          </View>
          <Text style={{ fontSize: 12, fontWeight: "400", paddingTop: 2 }}>
            ({numOfReviews})
          </Text>
        </View>

        {/* Review Button */}
        {hasReviewed ? (
          <View style={{ alignItems: "center", minWidth: 100 }}>
            <Text style={{ fontSize: 24, marginBottom: 8, color: "blue" }}>★</Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>{score}</Text>
              <Text style={{ fontSize: 12, color: "#666" }}> / 5</Text>
            </View>
            <Text style={{ fontSize: 12, fontWeight: "400", paddingTop: 2 }}>
              Your reviews (10)
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={onReviewPress}
            style={{ alignItems: "center", minWidth: 100 }}
          >
            <Text style={{ fontSize: 24, marginBottom: 8 }}>★</Text>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Review course</Text>
          </TouchableOpacity>
        )}

        {/* Bookmark / Save Button */}
        <TouchableOpacity
          onPress={handleBookmarkPress}
          style={{ alignItems: "center", minWidth: 100 }}
        >
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={28}
            color={isBookmarked ? "blue" : "black"}
            style={{ marginBottom: 8 }}
          />
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {isBookmarked ? "Saved" : "Save"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50, // adjust how tall the fade should be
  },
});

export default CourseHeader;
