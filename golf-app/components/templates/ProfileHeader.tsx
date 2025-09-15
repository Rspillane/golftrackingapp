import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { theme } from "../../constants/Colors";

interface ProfileHeaderProps {
  userAvatar?: string;
  userName: string;
  userTitle?: string;
  handicap?: number;
  numberOfUserReviews: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userAvatar,
  userName,
  userTitle,
  handicap,
  numberOfUserReviews
}) => {
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <View style={{ padding: 20 }}>
      <View style={{ alignItems: "center" }}>
        {/* Avatar */}
        {userAvatar
          ? <Image
              source={{ uri: userAvatar }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 999,
                marginBottom: 12
              }}
            />
          : <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 999,
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
          <Text style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
            @userName
          </Text>}
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ alignItems: "flex-start" }}>
          {/* Title (optional) */}
          <Text
            style={{
              fontSize: 12,
              color: "#999",
              marginTop: 8,
              fontWeight: theme.text.bold
            }}
          >
            {userTitle}
          </Text>
          {/* Handicap & Number of Reviews */}
          <Text style={{ fontSize: 12, color: "#999", marginTop: 8 }}>
            {handicap}
            {" Hcp   "}
            {numberOfUserReviews} Review{numberOfUserReviews !== 1 ? "s" : ""}
          </Text>
          {/* Join Date */}
          <Text style={{ fontSize: 12, color: "#999", marginTop: 8 }}>
            Joined September 2025{" "}
          </Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 32
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: theme.colors.lightPrimary,
                borderWidth: 1,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
                borderColor: theme.colors.lightPrimary
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
