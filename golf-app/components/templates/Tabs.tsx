import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import { theme } from "../../constants/Colors";

interface TabItem<T extends string> {
  key: T;
  label: string;
}

interface TabsProps<T extends string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (tabKey: T) => void;
}

function Tabs<T extends string>({ tabs, activeTab, onChange }: TabsProps<T>) {
  const [tabLayouts, setTabLayouts] = useState<{ x: number; width: number }[]>(
    []
  );

  // Shared values for animation
  const translateX = useSharedValue(0);
  const sliderWidth = useSharedValue(0);

  // Animate slider when active tab changes
  useEffect(
    () => {
      const index = tabs.findIndex(tab => tab.key === activeTab);
      if (tabLayouts[index]) {
        translateX.value = withTiming(tabLayouts[index].x, { duration: 200 });
        sliderWidth.value = withTiming(tabLayouts[index].width, {
          duration: 200
        });
      }
    },
    [activeTab, tabLayouts]
  );

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: sliderWidth.value
  }));

  const onTabLayout = (index: number) => (e: any) => {
    const { x, width } = e.nativeEvent.layout;
    setTabLayouts(prev => {
      const newLayouts = [...prev];
      newLayouts[index] = { x, width };
      return newLayouts;
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.colors.lightBgDark,
        alignItems: "center",
        borderRadius: 16,
        marginBottom: 8,
        padding: 4,
        height: 48
      }}
    >
      {/* Animated background slider */}
      <Animated.View
        style={[
          {
            position: "absolute",
            left: 0,
            height: 40,
            borderRadius: 12,
            backgroundColor: theme.colors.lightPrimary
          },
          sliderStyle
        ]}
      />

      {tabs.map((tab, index) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChange(tab.key)}
            onLayout={onTabLayout(index)}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 32
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "300",
                color: isActive ? theme.colors.lightSecondary : "#666"
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default Tabs;
