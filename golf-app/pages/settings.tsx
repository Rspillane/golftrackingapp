import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SettingsItemProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  isLast?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  subtitle,
  onPress,
  showArrow = true,
  isLast = false
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: "#e0e0e0"
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#000" }}>
          {title}
        </Text>
        {subtitle &&
          <Text style={{ fontSize: 14, color: "#666", marginTop: 2 }}>
            {subtitle}
          </Text>}
      </View>
      {showArrow && <Text style={{ fontSize: 16, color: "#666" }}>›</Text>}
    </TouchableOpacity>
  );
};

interface SettingsSectionProps {
  title?: string;
  items: Array<{
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
  }>;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, items }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      {title &&
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "#666",
            marginBottom: 8,
            marginLeft: 20,
            textTransform: "uppercase",
            letterSpacing: 0.5
          }}
        >
          {title}
        </Text>}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          marginHorizontal: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2
        }}
      >
        {items.map((item, index) =>
          <SettingsItem
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            onPress={item.onPress}
            showArrow={item.showArrow}
            isLast={index === items.length - 1}
          />
        )}
      </View>
    </View>
  );
};

const SettingsPage: React.FC<{ onBackPress?: () => void }> = ({
  onBackPress
}) => {
  const insets = useSafeAreaInsets();

  // Placeholder functions for settings actions
  const handleProfilePress = () =>
    Alert.alert("Profile", "Navigate to profile settings");
  const handleNotificationsPress = () =>
    Alert.alert("Notifications", "Navigate to notification settings");
  const handlePrivacyPress = () =>
    Alert.alert("Privacy", "Navigate to privacy settings");
  const handleAccountPress = () =>
    Alert.alert("Account", "Navigate to account settings");
  const handleSubscriptionPress = () =>
    Alert.alert("Subscription", "Navigate to subscription management");
  const handleDataPress = () =>
    Alert.alert("Data & Storage", "Navigate to data settings");
  const handleLanguagePress = () =>
    Alert.alert("Language", "Navigate to language settings");
  const handleRegionPress = () =>
    Alert.alert("Region", "Navigate to region settings");
  const handleAboutPress = () => Alert.alert("About", "Navigate to about page");
  const handleHelpPress = () => Alert.alert("Help", "Navigate to help center");
  const handleFeedbackPress = () =>
    Alert.alert("Feedback", "Navigate to feedback form");
  const handleTermsPress = () =>
    Alert.alert("Terms", "Navigate to terms of service");
  const handlePrivacyPolicyPress = () =>
    Alert.alert("Privacy Policy", "Navigate to privacy policy");
  const handleSignOutPress = () =>
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive" }
    ]);

  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          title: "Profile",
          subtitle: "Manage your profile information",
          onPress: handleProfilePress
        },
        {
          title: "Account Settings",
          subtitle: "Email, password, and security",
          onPress: handleAccountPress
        },
        {
          title: "Subscription",
          subtitle: "Manage your premium membership",
          onPress: handleSubscriptionPress
        }
      ]
    },
    {
      title: "Preferences",
      items: [
        {
          title: "Notifications",
          subtitle: "Push notifications and alerts",
          onPress: handleNotificationsPress
        },
        {
          title: "Privacy",
          subtitle: "Control your privacy settings",
          onPress: handlePrivacyPress
        },
        {
          title: "Data & Storage",
          subtitle: "Manage app data and storage",
          onPress: handleDataPress
        }
      ]
    },
    {
      title: "Regional",
      items: [
        {
          title: "Language",
          subtitle: "English",
          onPress: handleLanguagePress
        },
        {
          title: "Region",
          subtitle: "United Kingdom",
          onPress: handleRegionPress
        }
      ]
    },
    {
      title: "Support",
      items: [
        { title: "Help Center", onPress: handleHelpPress },
        { title: "Send Feedback", onPress: handleFeedbackPress },
        { title: "About", onPress: handleAboutPress }
      ]
    },
    {
      title: "Legal",
      items: [
        { title: "Terms of Service", onPress: handleTermsPress },
        { title: "Privacy Policy", onPress: handlePrivacyPolicyPress }
      ]
    },
    {
      items: [
        { title: "Sign Out", onPress: handleSignOutPress, showArrow: false }
      ]
    }
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={{ paddingTop: insets.top + 20, paddingBottom: 30 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 30,
            paddingHorizontal: 4
          }}
        >
          {onBackPress &&
            <TouchableOpacity
              onPress={onBackPress}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#f5f5f5",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 16
              }}
            >
              <Text style={{ fontSize: 18 }}>‹</Text>
            </TouchableOpacity>}
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#000",
              flex: 1,
              textAlign: onBackPress ? "left" : "center"
            }}
          >
            Settings
          </Text>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, index) =>
          <SettingsSection
            key={index}
            title={section.title}
            items={section.items}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default SettingsPage;
