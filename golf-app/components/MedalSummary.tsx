import React from "react";
import {
  View,
  Linking,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Medal from "./Medal";

interface MedalSummaryProps {}

const MedalSummary: React.FC<MedalSummaryProps> = ({}) => {
  const insets = useSafeAreaInsets();

  return (
    <>
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", marginLeft: -16, marginRight: -16 }} horizontal>
      <View style={{ flexDirection: "row" }}>
        <Medal />
        <Medal />
        <Medal />
        <Medal />
        <Medal />
        <Medal />
        <Medal />
      </View>
    </ScrollView>
    <TouchableOpacity
      onPress={() => Alert.alert("Medal Summary Clicked")}>
      <Text
        style={{
          textAlign: "left",
          fontSize: 16,
          color: "#007AFF",
          marginTop: 10
        }}>View Medal Table</Text>
      </TouchableOpacity>
    </>
  );
};

export default MedalSummary;
