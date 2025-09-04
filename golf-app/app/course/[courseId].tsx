import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import CoursePageHeader from "../../components/templates/CoursePageHeader";
import CourseDetailSection from "../../components/organisms/CourseReviewSection";
import ReviewPage from "./[courseId]/ReviewPage";
import BackButton from "@/components/atoms/BackButton";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../contexts/AuthContext";

const CoursePageRoute = () => {
  const [isReview, setIsReview] = useState(false);
  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewItems, setReviewItems] = useState<any[]>([]);
  const [userReviews, setUserReviews] = useState<Record<string, number>>({});
  const params = useLocalSearchParams();
  const courseId = Number(params.courseId);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course info
        const { data: coursesData, error: courseError } = await supabase
          .from("courses")
          .select("*")
          .eq("course_id", courseId)
          .single();

        if (courseError || !coursesData) {
          console.error("Course fetch error:", courseError);
          setCourse(null);
          setLoading(false);
          return;
        }

        setCourse(coursesData);

        // Fetch course reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from("reviews")
          .select("*")
          .eq("course_id", courseId);

        if (reviewsError) {
          console.error("Reviews fetch error:", reviewsError);
        }

        // Compute average scores per category
        const categories = ["teeboxes", "fairways", "greens", "clubhouse", "facilities", "value", "difficulty"];
        const averages: any[] = categories.map(cat => {
          const scores = reviewsData?.map(r => r[`ratings_${cat}`]).filter(Boolean) || [];
          const avg = scores.length ? scores.reduce((sum, s) => sum + s, 0) / scores.length : 0;
          return { label: cat, score: avg };
        });

        setReviewItems(averages);

        // Fetch current user's review if logged in
        if (user) {
          const { data: userData } = await supabase
            .from("reviews")
            .select("*")
            .eq("course_id", courseId)
            .eq("user_id", user.id)
            .single();

          const userScores: Record<string, number> = {};
          categories.forEach(cat => {
            userScores[cat] = userData ? userData[`ratings_${cat}`] : 0;
          });

          setUserReviews(userScores);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, user]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1, marginTop: 50 }} size="large" color="#007AFF" />;
  }

  if (!course) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 18, color: "#666", textAlign: "center" }}>Course not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <BackButton />
      <CoursePageHeader
        title={course.name}
        score={reviewItems.reduce((sum, r) => sum + r.score, 0) / reviewItems.length}
        numOfReviews={reviewItems.length}
        onReviewPress={() => setIsReview(true)}
        onBucketListPress={() => {}}
      />

      <CourseDetailSection
        course={course}
        reviewItems={reviewItems}
        userReviews={userReviews}
      />

      {!isReview && (
        <TouchableOpacity
          onPress={() => setIsReview(true)}
          style={{
            alignItems: "center",
            marginHorizontal: 16,
            padding: 15,
            minWidth: 100,
            borderRadius: 16,
            backgroundColor: "#3e9114ff",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>Start a Review</Text>
        </TouchableOpacity>
      )}

      {isReview && <ReviewPage courseName={course.name} />}
    </ScrollView>
  );
};

export default CoursePageRoute;
