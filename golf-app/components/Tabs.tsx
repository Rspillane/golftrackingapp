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

// TabItem is generic over T, which is the union of keys
export interface TabItem<T extends string> {
  key: T;
  label: string;
}

interface TabsProps<T extends string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (tabKey: T) => void;
}

function Tabs<T extends string>({ tabs, activeTab, onChange }: TabsProps<T>) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 20 }}>
      {tabs.map(tab =>
        <TabButton
          key={tab.key}
          label={tab.label}
          isActive={activeTab === tab.key}
          onPress={() => onChange(tab.key)}
        />
      )}
    </View>
  );
}

export default Tabs;
