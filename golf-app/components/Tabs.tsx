import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onPress }) =>
  <TouchableOpacity
    onPress={onPress}
    style={{
      flex: 1,
      paddingVertical: 12,
      borderBottomWidth: 2,
      borderBottomColor: isActive ? "#007AFF" : "transparent"
    }}
  >
    <Text
      style={{
        textAlign: "center",
        fontSize: 16,
        fontWeight: isActive ? "600" : "500",
        color: isActive ? "#007AFF" : "#666"
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>;

interface TabsProps {
  activeTab: "info" | "ratings";
  onChange: (tab: "info" | "ratings") => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onChange }) =>
  <View style={{ flexDirection: "row", marginBottom: 20 }}>
    <TabButton
      label="Player Ratings"
      isActive={activeTab === "ratings"}
      onPress={() => onChange("ratings")}
    />
    <TabButton
      label="Course Info"
      isActive={activeTab === "info"}
      onPress={() => onChange("info")}
    />
  </View>;

export default Tabs;
