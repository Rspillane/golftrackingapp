import React, { useState } from "react";
import { View } from "react-native";
import ProfilePage from "../../components/pages/ProfilePage";
import SettingsPage from "../../components/pages/SettingsPage";

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
          <ProfilePage
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
          <ProfilePage
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
