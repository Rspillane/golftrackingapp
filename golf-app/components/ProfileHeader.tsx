import React from "react";
import { View, Text, Image } from "react-native";

interface ProfileHeaderProps {
  userAvatar?: string;
  userName: string;
  userTitle?: string;
  numberOfUserReviews: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userAvatar,
  userName,
  userTitle,
  numberOfUserReviews
}) => {
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <View
      style={{
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
      }}
    >
      {/* Avatar */}
      {userAvatar
        ? <Image
            source={{ uri: userAvatar }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginBottom: 12
            }}
          />
        : <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#ccc",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 12
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 24 }}>
              {initials}
            </Text>
          </View>}

      {/* Name */}
      <Text style={{ fontSize: 22, fontWeight: "700", color: "#222" }}>
        {userName}
      </Text>

      {/* Title (optional) */}
      {userTitle &&
        <Text style={{ fontSize: 16, color: "#666", marginTop: 4 }}>
          {userTitle}
        </Text>}

      {/* Number of Reviews */}
      <Text style={{ fontSize: 14, color: "#999", marginTop: 8 }}>
        {numberOfUserReviews} Review{numberOfUserReviews !== 1 ? "s" : ""}
      </Text>
    </View>
  );
};

export default ProfileHeader;
