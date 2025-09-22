import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or react-native-vector-icons
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from "../../../constants/Colors"

interface CourseHeaderProps {
  title: string;
  score?: number;
  par?: number;
  length?: number;
  slope?: number;
  rating?: number;
  numOfReviews?: number;
  onReviewPress?: () => void;
  onBucketListPress?: () => void;
  isReview?: boolean;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  title,
  par,
  length,
  slope, rating,
  score,
  numOfReviews,
  onReviewPress,
  onBucketListPress,
  isReview,
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
          backgroundColor: theme.colors.lightBgDark,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.text.muted, fontSize: 16 }}>No Image Available</Text>
      </View>
      {/* Course Header Card */}
      <View style={{backgroundColor: theme.colors.lightBgLight, borderRadius: 12, padding: 16, overflow: 'hidden', marginTop: -16, width: "100%", zIndex: 1}}>
        {/* Course Title Card */}
        <View style={{ flexDirection: "row", gap: 16}}>
          <View style={{ flexDirection: "column", flex: 1,}}> 
          <Text style={{ fontSize: 20, fontWeight: theme.text.bold, flexWrap: "wrap", paddingBottom: 8}}>
            {title}
          </Text>
          <View style={{justifyContent: "space-between", flexDirection: "row"}}>
          <Text>
            Par {par}
          </Text>
          <Text>
            {length? length : "?"} yards
          </Text>
          <Text>
            {slope? slope : "slope"} / {rating? rating : "rating"}
          </Text>
          </View>
          </View>
          <View style={{alignItems: "flex-start"}}>
            <TouchableOpacity
            onPress={onReviewPress}
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                  paddingVertical: 8,
                  borderRadius: 12,
                  backgroundColor: isReview ? "#A20101" : theme.colors.lightPrimary,
                zIndex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: isReview ? "white" : theme.colors.lightSecondary,
                  paddingHorizontal: 24,
                  fontWeight: 300
                }}
              >
                {isReview ? "Cancel" : "Review"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Scores */}
        <View style={{flexDirection: "row", justifyContent: "space-between", paddingTop: 16, paddingBottom: 8}}>
          <View style={{flex: 1}}>
            <Text style={{fontWeight:"bold"}}>Community Score</Text>
              <View>
                <Text style={{ fontSize: 24, color: "green" }}>★★★★★</Text>
              </View>
              <Text style={{ fontSize: 12, fontWeight: "400" }}>
                ({numOfReviews})
              </Text>
          </View>
            <View style={{flex: 1}}>
          <Text  style={{fontWeight:"bold"}}>Your Score</Text>
              <View>
                <Text style={{ fontSize: 24, color: "green" }}>★★★★★</Text>
              </View>
              <Text style={{ fontSize: 12, fontWeight: "400" }}>
                ({numOfReviews})
              </Text>
          </View>
        </View>
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
