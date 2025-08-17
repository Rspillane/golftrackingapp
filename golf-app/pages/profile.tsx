import React from "react";
import {
  View,
  Linking,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileHeader";
import ProfileCourseTabs from "../components/ProfileCourseTabs";

interface ProfileProps {
  userName?: string;
  userTitle?: string;
  userAvatar?: string; // optional image URL
  numberOfUserReviews?: number;
}

const Profile: React.FC<ProfileProps> = ({
  userName = "Sarah Johnson",
  userTitle = "Scratch Golfer",
  numberOfUserReviews = 12
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          paddingVertical: insets.top,
          backgroundColor: "#fff",
          paddingHorizontal: 20
        }}
      >
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
