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
import CourseInfoItem from "../organisms/CourseInfoItem";
import CoursePageHeader from "../templates/CoursePageHeader";
import CourseUserReview from "../templates/CourseUserReview";
import Tabs from "../templates/Tabs";
import Comment from "../organisms/Comment";
import { useRouter } from "expo-router"; 


interface TeeDetail {
  tee: string;
  par?: number;
  length_yards?: number;
  rating?: number | null;
  slope?: number | null;
}

export interface Course {
  course_id: number;
  course_name: string;
  region?: string | null;
  county?: string | null;
  phone_number?: string | null;
  description?: string | null;
  website?: string | null;
  address?: string | null;
  holes?: number | null;
  par?: number | null;
  length_yards?: number | null;
  tee_details?: TeeDetail[] | null;
  practice?: {
    driving_range?: boolean | null;
    putting_green?: boolean | null;
    chipping_green?: boolean | null;
    practice_bunker?: boolean | null;
  } | null;
  rentals?: {
    rental_carts?: boolean | null;
    rental_clubs?: boolean | null;
  } | null;
  url?: string;
}


interface CoursePageProps {
  course: Course;
  reviewItems?: {
    label: "Teeboxes" | "Fairways" | "Greens" | "Clubhouse" | "Facilities" | "Pace of play";
    score: number;
    userScore?: 1 | 2 | 3 | 4 | 5;
    modalMessage: string;
  }[];
  numOfReviews?: number;
  image?: string;
  score?: number;
  paceOfPlay?: number;

}

const CoursePage: React.FC<CoursePageProps> = ({
  course,
  reviewItems = [],
  numOfReviews = 0,
  image,
  score
}) => {
  const [activeTab, setActiveTab] = React.useState<"info" | "ratings">("ratings");
  const insets = useSafeAreaInsets();
const router = useRouter();
  const handleWebsitePress = async () => {
    if (course.website) {
      try {
        const supported = await Linking.canOpenURL(course.website);
        if (supported) {
          await Linking.openURL(course.website);
        } else {
          Alert.alert("Error", "Cannot open this website");
        }
      } catch {
        Alert.alert("Error", "Failed to open website");
      }
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ paddingTop: insets.top, backgroundColor: "#fff", paddingLeft: 16 }} />
            <View style={{ padding: 16, backgroundColor: "#fff" }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 8,
            backgroundColor: "#eee",
            borderRadius: 8,
            width: 80,
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 16 }}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 20 }}>
        <CoursePageHeader
          title={course.course_name}
          image={image}
          score={score}
          numOfReviews={numOfReviews}
          onReviewPress={() => {}}
          onBucketListPress={() => {}}
        />

        <TouchableOpacity
          onPress={() => Linking.openURL(course.url || course.website || "")}
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

        {activeTab === "ratings" && (
          <View
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0
            }}
          >
            {reviewItems.map((item, index) => (
              <CourseUserReview
                key={index}
                label={item.label}
                score={item.score}
                userScore={item.userScore}
                isLast={index === reviewItems.length - 1}
                modalMessage={item.modalMessage}
              />
            ))}
          </View>
        )}

        {activeTab === "info" && (
          <View
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0
            }}
          >
            {[
              { label: "Course Par", value: course.par ? `${course.par}` : "Unknown" },
              { label: "Holes", value: course.holes ? `${course.holes} Holes` : "Unknown" },
              { label: "Yardage", value: course.length_yards ? `${course.length_yards} yards` : "Unknown" },
              course.website
                ? { label: "Website", value: "Visit →", isLink: true, onPress: handleWebsitePress }
                : null,
              course.practice?.driving_range
                ? { label: "Driving Range", value: "Available" }
                : null,
              course.practice?.putting_green
                ? { label: "Putting Green", value: "Available" }
                : null,
              course.rentals?.rental_carts
                ? { label: "Rental Carts", value: "Available" }
                : null,
              course.rentals?.rental_clubs
                ? { label: "Rental Clubs", value: "Available" }
                : null,
              course.address ? { label: "Address", value: course.address } : null
            ]
              .filter(Boolean)
              .map((item, index, arr) => (
                <CourseInfoItem
                  key={item!.label}
                  label={item!.label}
                  value={item!.value}
                  isLink={item!.isLink}
                  onPress={item!.onPress}
                  isLast={index === arr.length - 1}
                />
              ))}
          </View>
        )}
      </View>

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Golfer Reviews
        </Text>
        <Comment
          userName="Sarah Johnson"
          comment="Loved the course! The greens were rolling fast and true."
          commentDate="August 17, 2025"
          userReviewScore={9}
          strokes={75}
        />

        <Comment
          userName="James Miller"
          comment="Decent value for money, but the pace of play was slow."
          commentDate="August 12, 2025"
          userReviewScore={8}
          strokes={80}
        />
      </View>

      <View style={{ paddingBottom: insets.bottom + 50 }} />
    </ScrollView>
  );
};

export default CoursePage;

