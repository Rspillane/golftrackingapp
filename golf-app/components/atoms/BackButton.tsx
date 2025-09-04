// BackButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { useRouter } from "expo-router"; // or your routing library

interface BackButtonProps {
  onPress?: () => void;
  style?: ViewStyle;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  style,
  label = "← Back"
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.backButton, style]}>
      <Text style={styles.text}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    left: 12,
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    width: 80,
    alignItems: "center"
  },
  text: {
    fontSize: 16
  }
});

export default BackButton;
