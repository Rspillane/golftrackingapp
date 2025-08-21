import React, { useState } from "react";
import { View } from "react-native";
import Profile from "../../components/pages/profile"; // Your existing profile component
import SettingsPage from "../../components/pages/settings"; // Your new settings component

type ProfileTabPage = "profile" | "settings";

const ProfileTabContainer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<ProfileTabPage>("profile");

  const navigateToSettings = () => {
    setCurrentPage("settings");
  };

  const navigateBackToProfile = () => {
    setCurrentPage("profile");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "profile":
        return (
          <Profile
            userName="Sarah Johnson"
            userTitle="Scratch Golfer"
            numberOfUserReviews={12}
            onSettingsPress={navigateToSettings}
          />
        );
      case "settings":
        return <SettingsPage onBackPress={navigateBackToProfile} />;
      default:
        return (
          <Profile
            userName="Sarah Johnson"
            userTitle="Scratch Golfer"
            numberOfUserReviews={12}
            onSettingsPress={navigateToSettings}
          />
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderCurrentPage()}
    </View>
  );
};

export default ProfileTabContainer;
