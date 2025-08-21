import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
}

const Disclosure: React.FC<DisclosureProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <View
      style={{
        marginVertical: 12
      }}
    >
      <TouchableOpacity onPress={toggle}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          {title} {open ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>

      {open &&
        <View style={{ padding: 2, backgroundColor: "#fff" }}>
          {children}
        </View>}
    </View>
  );
};

export default Disclosure;
