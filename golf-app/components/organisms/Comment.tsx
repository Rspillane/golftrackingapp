import React from "react";
import { View, Text, Image } from "react-native";
import ReviewScore from "../molecules/ReviewScore";

interface CommentProps {
  userAvatar?: string; // optional image URL
  userName: string;
  userTitle?: string; // optional (e.g. "Scratch Golfer")
  comment: string;
  commentDate: string; // formatted date string
  userReviewScore?: number; // optional review score
  strokes?: number; // optional strokes count
}

const Comment: React.FC<CommentProps> = ({
  userAvatar,
  userName,
  userTitle,
  comment,
  commentDate,
  userReviewScore,
  strokes
}) => {
  // fallback initials if no avatar
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 12,
        padding: 16,
        backgroundColor: "#fff",
        marginBottom: 12
      }}
    >
      {/* User Info */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        {userAvatar
          ? <Image
              source={{ uri: userAvatar }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                marginRight: 12
              }}
            />
          : <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: "#ccc",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 16 }}>
                {initials}
              </Text>
            </View>}

        <View>
          <Text style={{ fontWeight: "600", fontSize: 16, color: "#222" }}>
            {userName}
          </Text>
          {userTitle &&
            <Text style={{ fontSize: 14, color: "#666" }}>
              {userTitle}
            </Text>}
        </View>
      </View>

      {/* Comment Body */}
      <Text
        style={{ fontSize: 15, color: "#333", lineHeight: 20, marginBottom: 8 }}
      >
        {comment}
      </Text>
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
        {userReviewScore && <ReviewScore userReviewScore={9} />}
      </View>
      {/* Date */}
      <Text
        style={{
          paddingTop: 12,
          fontSize: 14,
          color: "#666",
          fontStyle: "italic"
        }}
      >
        {strokes
          ? `Shot ${strokes} on ${commentDate}`
          : `Rated on the ${commentDate}`}
      </Text>
    </View>
  );
};

export default Comment;
