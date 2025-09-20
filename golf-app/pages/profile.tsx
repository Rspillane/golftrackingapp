import React from "react";
import { View, Alert, ScrollView, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfileHeader from "../components/pages/ProfilePage/ProfileHeader";
import ProfileCourseTabs from "../components/ProfileCourseTabs";

interface ProfileProps {
  userName?: string;
  userTitle?: string;
  userAvatar?: string; // optional image URL
  numberOfUserReviews?: number;
  onSettingsPress?: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  userName = "Sarah Johnson",
  userTitle = "Scratch Golfer",
  numberOfUserReviews = 12,
  onSettingsPress
}) => {
  const insets = useSafeAreaInsets();

  const handleSettingsPress = () => {
    if (onSettingsPress) {
      onSettingsPress();
    } else {
      // Fallback if no navigation function provided
      Alert.alert("Settings", "Navigate to settings page");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          paddingVertical: insets.top,
          backgroundColor: "#fff",
          paddingHorizontal: 20
        }}
      >
        {/* Header with Settings Button */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 10,
            paddingTop: 10
          }}
        >
          <TouchableOpacity
            onPress={handleSettingsPress}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "#f5f5f5",
              justifyContent: "center",
              alignItems: "center"
            }}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 20 }}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <ProfileHeader
          userName={userName}
          userTitle={userTitle}
          numberOfUserReviews={numberOfUserReviews}
        />
        <ScrollView>
          <ProfileCourseTabs />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Profile;
