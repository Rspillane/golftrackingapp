import React from "react";
import {
  View,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfileHeader from "../templates/ProfileHeader";
import ProfileCourseTabs from "../templates/ProfileCourseTabs";

interface ProfileProps {
  userName?: string;
  userTitle?: string;
  userAvatar?: string; // optional image URL
  numberOfUserReviews?: number;
  handicap?: number;
  onSettingsPress?: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  userName = "Sarah Johnson",
  userTitle = "Local Legend",
  handicap = 21,
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
      <View style={{ paddingVertical: insets.top, backgroundColor: "#fff" }}>
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
              top: 16,
              right: 16,
              position: "absolute",
              borderRadius: 22,
              backgroundColor: "#f5f5f5",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              zIndex: 1
            }}
            activeOpacity={0.7}
          >
            <Image
              source={require("../../assets/icons/settings.svg")}
              style={{ width: 22, height: 22 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <ProfileHeader
          userName={userName}
          userTitle={userTitle}
          numberOfUserReviews={numberOfUserReviews}
          handicap={handicap}
        />
        <ScrollView>
          <ProfileCourseTabs />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Profile;
