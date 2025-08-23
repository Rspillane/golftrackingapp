import React from "react";
import { View, Text } from "react-native";
import CoursePage from "../../components/pages/CoursePage";
import courses from "../../assets/data/courses.json";

import { useLocalSearchParams } from "expo-router";

const CoursePageRoute = () => {
  const params = useLocalSearchParams(); // <— correct hook
  const courseId = Number(params.courseId); // params are always string

  const course = courses.find(c => c.course_id === courseId);

  if (!course) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "#fff"
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#666",
            textAlign: "center"
          }}
        >
          Course not found.
        </Text>
      </View>
    );
  }

  return (
    <CoursePage
      course={course}
      reviewItems={[
        {
          label: "Teeboxes",
          score: 4,
          userScore: 4,
          modalMessage:
            "What were the teeboxes like? Flat? Well Signposted? Let us know!"
        },
        {
          label: "Fairways",
          score: 4,
          userScore: 4,
          modalMessage: "Were the fairways in good knick? did you hit them? 👀"
        },
        {
          label: "Greens",
          score: 5,
          userScore: 4,
          modalMessage:
            "No one likes a bobbly green. What would you rate these?"
        },
        {
          label: "Clubhouse",
          score: 4,
          userScore: 4,
          modalMessage:
            "What would you give the clubhouse? Was the food good? Nice clean changing rooms?"
        },
        {
          label: "Facilities",
          score: 3,
          userScore: 4,
          modalMessage:
            "Did the course have any practice facilties? let us know what you thought?"
        },
        {
          label: "Pace of play",
          score: 4,
          userScore: 4,
          modalMessage:
            "The thing Tee'd up hate most is slow play. What was your round like? Was it too busy? Give it 1 star then"
        }
      ]}
      numOfReviews={24}
      image="https://images.golfpass.com/courses/1000/1000/1113.jpg"
      score={4.5}
    />
  );
};
export default CoursePageRoute;
