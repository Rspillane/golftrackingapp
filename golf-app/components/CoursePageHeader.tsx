import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface CourseHeaderProps {
  title: string;
  image?: string;
  score?: number;
  onReviewPress: () => void;
  onBucketListPress: () => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  title,
  image,
  score,
  onReviewPress,
  onBucketListPress,
}) => {
  const hasReviewed = score !== undefined && score > 0;
  return (
    <>
      {/* Course Image */}
      {image
        ? <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 12,
              marginBottom: 20
            }}
            resizeMode="cover"
          />
        : <View
            style={{
              width: "100%",
              height: 200,
              backgroundColor: "#e0e0e0",
              borderRadius: 12,
              marginBottom: 20,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#999", fontSize: 16 }}>
              No Image Available
            </Text>
          </View>}

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
          paddingTop: 5,
          paddingBottom: 15,
          gap: 16,
          alignItems: "center",
        }}
      >
        {/* Review Score */}
        <TouchableOpacity
          onPress={onReviewPress}
          style={{ alignItems: "center", padding: 15, minWidth: 100 }}
        >
          <Text style={{ fontSize: 24, marginBottom: 8 }}>⭐</Text>

            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {score}
          </Text>
          <Text style={{ fontSize: 12, color: "#666" }}> / 10</Text>
          </View>
          <Text style={{ fontSize: 12, fontWeight: "400", paddingTop: 2  }}>1,000</Text>

        </TouchableOpacity>

        {/* Review Button */}
        {hasReviewed &&
        <TouchableOpacity
          onPress={onReviewPress}
          style={{ alignItems: "center", minWidth: 100 }}
        >
          <Text style={{ fontSize: 24, marginBottom: 8 }}>⭐</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>{score}</Text>
            <Text style={{ fontSize: 12, color: "#666" }}> / 10</Text>
          </View>
          <Text style={{ fontSize: 12, fontWeight: "400", paddingTop: 2 }}>Your review</Text>
        </TouchableOpacity>
}
        {!hasReviewed &&
        <TouchableOpacity
          onPress={onReviewPress}
          style={{ alignItems: "center", minWidth: 100 }}
        >
          <Text style={{ fontSize: 24, marginBottom: 8 }}>★</Text>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Review course</Text>
        </TouchableOpacity>
}
        {/* Bucket List Button */}
        <TouchableOpacity
          onPress={onBucketListPress}
          style={{ alignItems: "center", minWidth: 100 }}
        >
          <Text style={{ fontSize: 24, marginBottom: 8 }}>➕</Text>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Bucket List</Text>
        </TouchableOpacity>
      </View>
      </>
  );
};

export default CourseHeader;
