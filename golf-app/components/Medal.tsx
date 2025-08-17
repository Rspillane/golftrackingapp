import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MedalProps {}

const Medal: React.FC<MedalProps> = ({}) => {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <Text style={{ fontSize: 60 }}>🎖️</Text>
    </View>
  );
};

export default Medal;
