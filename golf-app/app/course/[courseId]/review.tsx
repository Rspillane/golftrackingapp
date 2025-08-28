import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CourseUserReview from "../../../components/templates/CourseUserReview"; // adjust path
import DropDownPicker from "react-native-dropdown-picker";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const REVIEW_TOPICS = [
  {
    label: "Fairways",
    modalMessage: "Rate the condition and quality of the fairways"
  },
  {
    label: "Teeboxes",
    modalMessage: "Rate the condition and setup of the tee boxes"
  },
  {
    label: "Greens",
    modalMessage: "How smooth, true and consistent were the greens?"
  },
  {
    label: "Pace of play",
    modalMessage: "How was the overall pace of play during your round?"
  },
  {
    label: "Value for money",
    modalMessage: "Was the round worth the price paid?"
  },
  {
    label: "Facilities",
    modalMessage: "Practice areas, restrooms, pro shop, etc."
  },
  {
    label: "Clubhouse",
    modalMessage: "Rate the clubhouse experience (food, service, etc.)"
  }
];

export default function ReviewPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // course id

  // Ratings state
  const [userScores, setUserScores] = useState<{ [key: string]: number }>({});

  // Round details state
  const today = new Date();
  const [day, setDay] = useState(String(today.getDate()).padStart(2, "0"));
  const [month, setMonth] = useState(
    String(today.getMonth() + 1).padStart(2, "0")
  );
  const [year, setYear] = useState(String(today.getFullYear()));

  const [roundTime, setRoundTime] = useState("6am - 8am");
  const [openTimeDropdown, setOpenTimeDropdown] = useState(false);
  const [strokes, setStrokes] = useState("");
  const [pricePaid, setPricePaid] = useState("");

  const insets = useSafeAreaInsets();

  const timeOptions = [
    { label: "6am - 8am", value: "6am - 8am" },
    { label: "8am - 10am", value: "8am - 10am" },
    { label: "10am - 12pm", value: "10am - 12pm" },
    { label: "12pm - 2pm", value: "12pm - 2pm" },
    { label: "2pm - 4pm", value: "2pm - 4pm" },
    { label: "4pm - 6pm", value: "4pm - 6pm" }
  ];

  const handleSaveUserScore = (label: string, newScore: number) => {
    setUserScores(prev => ({
      ...prev,
      [label]: newScore
    }));
  };

  const handleSubmit = () => {
    const reviewData = {
      courseId: id,
      userScores,
      roundDate: `${day}/${month}/${year}`,
      roundTime,
      strokes,
      pricePaid
    };

    Alert.alert("Review Submitted", JSON.stringify(reviewData, null, 2));
    router.back();
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 16
      }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={{ padding: 16 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={{ fontSize: 16 }}>← Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.pageTitle}>
        Review Course {id}
      </Text>

      {/* Ratings Section */}
      <View style={styles.section}>
        {REVIEW_TOPICS.map((topic, index) =>
          <CourseUserReview
            key={topic.label}
            label={topic.label}
            score={0}
            userScore={userScores[topic.label]}
            modalMessage={topic.modalMessage}
            isLast={index === REVIEW_TOPICS.length - 1}
            onSaveUserScore={newScore =>
              handleSaveUserScore(topic.label, newScore)}
          />
        )}
      </View>

      {/* Round Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Round Details</Text>

        {/* Date Row */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Date of Round</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TextInput
              value={day}
              onChangeText={setDay}
              keyboardType="number-pad"
              maxLength={2}
              style={styles.smallInput}
            />
            <TextInput
              value={month}
              onChangeText={setMonth}
              keyboardType="number-pad"
              maxLength={2}
              style={styles.smallInput}
            />
            <TextInput
              value={year}
              onChangeText={setYear}
              keyboardType="number-pad"
              maxLength={4}
              style={styles.yearInput}
            />
          </View>
        </View>

        {/* Tee Time Row */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Tee Time</Text>
          <View style={{ width: 140, zIndex: 1000 }}>
            <DropDownPicker
              open={openTimeDropdown}
              value={roundTime}
              items={timeOptions}
              setOpen={setOpenTimeDropdown}
              setValue={setRoundTime}
              setItems={() => {}}
              style={{ backgroundColor: "#fff", borderColor: "#ccc" }}
              dropDownContainerStyle={{
                backgroundColor: "#f5f5f5",
                borderColor: "#ccc"
              }}
            />
          </View>
        </View>

        {/* Score Row */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Score (strokes)</Text>
          <TextInput
            placeholder="85"
            value={strokes}
            onChangeText={setStrokes}
            keyboardType="number-pad"
            style={styles.smallInput}
          />
        </View>

        {/* Price Row */}
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Text style={styles.rowLabel}>Price Paid (£)</Text>
          <TextInput
            placeholder="40"
            value={pricePaid}
            onChangeText={setPricePaid}
            keyboardType="number-pad"
            style={styles.smallInput}
          />
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
          Submit Review
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    width: 80,
    alignItems: "center"
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  section: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "500"
  },
  smallInput: {
    width: 60,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff"
  },
  yearInput: {
    width: 80,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff"
  },
  submitButton: {
    alignItems: "center",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 16,
    backgroundColor: "#3e9114ff"
  }
});
