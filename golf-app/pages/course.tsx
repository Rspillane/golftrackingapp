import React from "react";
import {
  View,
  Linking,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import { IconSymbol } from "../components/ui/IconSymbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CourseInfoItem from "../components/CourseInfoItem";
import CoursePageHeader from "../components/CoursePageHeader";
import CourseUserReview from "../components/CourseUserReview";
import Tabs from "../components/Tabs";
import Comment from "../components/Comment";

interface ReviewsProps {
  teeboxes: number;
  holes: 9 | 18 | undefined;
  fairways: number;
  greens: number;
  clubhouse: number;
  facilities: number;
  value: number;
}

interface CoursePageProps {
  title: string;
  par: string;
  website?: string;
  holes?: 9 | 18 | undefined;
  range?: boolean;
  image?: string;
  score?: number;
  address?: string;
  greenFee?: number;
  paceOfPlay:
    | "1-2 hours"
    | "2-3 hours"
    | "3-4 hours"
    | "4-5 hours"
    | "5+ hours";
  reviewItems: {
    label: string;
    value: ReviewsProps;
  }[];
  numOfReviews?: number;
}

const CoursePage: React.FC<CoursePageProps> = ({
  title,
  par,
  holes,
  website,
  range,
  image,
  score,
  address,
  reviewItems,
  numOfReviews,
  paceOfPlay,
  greenFee
}) => {
  const [activeTab, setActiveTab] = React.useState<"info" | "ratings">(
    "ratings"
  );

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
      <View
        style={{
          paddingTop: insets.top,
          backgroundColor: "#fff",
          paddingLeft: 16
        }}
      >
        <IconSymbol
          name="chevron.backward"
          color="#000"
          style={{ padding: 16 }}
        />
      </View>
      <View style={{ padding: 20 }}>
        <CoursePageHeader
          title={title}
          image={image}
          score={score}
          numOfReviews={numOfReviews}
          onReviewPress={handleReviewPress}
          onBucketListPress={handleBucketListPress}
        />
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.golfnow.com")}
          style={{
            alignItems: "center",
            padding: 15,
            minWidth: 100,
            borderRadius: 16,
            backgroundColor: "#3e9114ff"
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
            Book a round with Golf Now
          </Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 12 }} />
        <Tabs
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            { key: "info", label: "Course Info" },
            { key: "ratings", label: "Player Ratings" }
          ]}
        />
        {activeTab === "ratings" &&
          <View style={{ backgroundColor: "#f5f5f5", borderRadius: 8 }}>
            {reviewItems.map((item, index) =>
              <CourseUserReview
                key={item.label}
                label={item.label}
                value={item.value}
                isLast={index === reviewItems.length - 1}
              />
            )}
          </View>}
        {/* Tab content */}
        {activeTab === "info" &&
          <View style={{ backgroundColor: "#f5f5f5", borderRadius: 8 }}>
            {[
              { label: "Course Par", value: par ? `${par}` : "Unknown" },
              { label: "Holes", value: holes ? `${holes} Holes` : "Unknown" },
              paceOfPlay
                ? {
                    label: "Pace of Play",
                    value: `approx. ${paceOfPlay}`,
                    onPress: handleRangePress
                  }
                : null,
              greenFee
                ? {
                    label: "Green Fee",
                    value: `£ ${greenFee.low}`,
                    onPress: handleRangePress
                  }
                : null,
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
              .filter(Boolean)
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
          </View>}
      </View>
      <View style={{ padding: 20 }}>
        <Comment
          userName="Sarah Johnson"
          userTitle="Scratch Golfer"
          comment="Loved the course! The greens were rolling fast and true."
          commentDate="August 17, 2025"
        />

        <Comment
          userName="James Miller"
          comment="Decent value for money, but the pace of play was slow."
          commentDate="August 12, 2025"
        />
      </View>
      <View style={{ paddingBottom: insets.bottom + 50 }} />
    </ScrollView>
  );
};

export default CoursePage;
