import React from "react";
import { View, Linking, Alert, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CourseInfoItem from "../components/CourseInfoItem";
import CoursePageHeader from "../components/CoursePageHeader";
import CourseUserReview from "../components/CourseUserReview";

interface CoursePageProps {
  title: string;
  par: string;
  website?: string;
  range?: boolean;
  image?: string;
  score?: number;
  address?: string;
  reviewItems: {
    label: string;
    value: any;
  }[];
}

const CoursePage: React.FC<CoursePageProps> = ({
  title,
  par,
  website,
  range,
  image,
  score,
  address,
  reviewItems
}) => {
  const insets = useSafeAreaInsets();
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

  const handleReviewPress = () => {
    Alert.alert("Reviews", "Navigate to reviews section");
  };

  const handleBucketListPress = () => {
    Alert.alert("Bucket List", "Add to bucket list functionality");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 20, paddingTop: insets.top + 20 }}>
        <CoursePageHeader
          title={title}
          image={image}
          score={score}
          onReviewPress={handleReviewPress}
          onBucketListPress={handleBucketListPress}
        />

        {/* Course Information List */}
        <View style={{ backgroundColor: "#f5f5f5", borderRadius: 8 }}>
          {[
            { label: "Course Par", value: par },
            website
              ? {
                  label: "Website",
                  value: "Visit →",
                  isLink: true,
                  onPress: handleWebsitePress
                }
              : null,
            range
              ? {
                  label: "Driving Range",
                  value: "Available →",
                  isLink: true,
                  onPress: handleRangePress
                }
              : null,
            address
              ? {
                  label: "Address",
                  value: address,
                  isLink: true,
                  onPress: handleRangePress
                }
              : null
          ]
            .filter(Boolean) // remove nulls
            .map((item, index, arr) =>
              <CourseInfoItem
                key={item!.label}
                label={item!.label}
                value={item!.value}
                isLink={item!.isLink}
                onPress={item!.onPress}
                isLast={index === arr.length - 1}
              />
            )}
        </View>
        <View style={{ marginVertical: 20 }} />
        {/* Course User Reviews */}
        <View style={{ backgroundColor: "#f5f5f5", borderRadius: 8 }}>
          {reviewItems.map((item, index) =>
            <CourseUserReview
              key={item.label}
              label={item.label}
              value={item.value}
              isLast={index === reviewItems.length - 1}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default CoursePage;
