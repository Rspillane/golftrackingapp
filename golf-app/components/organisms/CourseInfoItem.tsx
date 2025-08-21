import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface CourseInfoItemProps {
  label: string;
  value?: string;
  isLink?: boolean;
  onPress?: () => void;
  isLast?: boolean;
}

const CourseInfoItem: React.FC<CourseInfoItemProps> = ({
  label,
  value,
  isLink = false,
  onPress,
  isLast = false
}) => {
  const Container: any = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: "#e0e0e0",
        gap: 16
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "500" }}>
        {label}
      </Text>
      {value &&
        <Text
          style={{
            fontSize: 16,
            color: isLink ? "#007AFF" : "#666",
            flexShrink: 1,
            textAlign: "right",
            flexWrap: "wrap",
            wordWrap: "break-word"
          }}
        >
          {value}
        </Text>}
    </Container>
  );
};

export default CourseInfoItem;
