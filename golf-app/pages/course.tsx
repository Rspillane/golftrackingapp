import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView
} from "react-native";

interface CoursePageProps {
  title: string;
  par: string;
  website?: string;
  range?: boolean;
}

const CoursePage: React.FC<CoursePageProps> = ({
  title,
  par,
  website,
  range
}) => {
  const handleWebsitePress = async () => {
    if (website) {
      try {
        const supported = await Linking.canOpenURL(website);
        if (supported) {
          await Linking.openURL(website);
        } else {
          Alert.alert("Error", "Cannot open this website");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to open website");
      }
    }
  };

  const handleRangePress = () => {
    // Placeholder for range functionality
    Alert.alert("Driving Range", "Navigate to driving range section");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 20, paddingTop: 60 }}>
        {/* Course Title */}
        <View style={{ marginBottom: 30 }}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            {title}
          </Text>
        </View>

        {/* Course Information List */}
        <View style={{ backgroundColor: "#f5f5f5", borderRadius: 8 }}>
          {/* Par Information */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0"
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Course Par</Text>
            <Text style={{ fontSize: 16, color: "#666" }}>
              {par}
            </Text>
          </View>

          {/* Website Link */}
          {website &&
            <TouchableOpacity
              onPress={handleWebsitePress}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15,
                borderBottomWidth: range ? 1 : 0,
                borderBottomColor: "#e0e0e0"
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Website</Text>
              <Text style={{ fontSize: 16, color: "#007AFF" }}>Visit →</Text>
            </TouchableOpacity>}

          {/* Driving Range */}
          {range &&
            <TouchableOpacity
              onPress={handleRangePress}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Driving Range
              </Text>
              <Text style={{ fontSize: 16, color: "#007AFF" }}>
                Available →
              </Text>
            </TouchableOpacity>}
        </View>

        {/* Additional sections can be added here */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
            Course Features
          </Text>
          <View
            style={{ backgroundColor: "#f5f5f5", borderRadius: 8, padding: 15 }}
          >
            <Text style={{ fontSize: 14, color: "#666", lineHeight: 20 }}>
              Additional course information and features will be displayed here.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CoursePage;
