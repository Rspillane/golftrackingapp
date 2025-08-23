import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ReviewScore from "../organisms/ReviewScore";
import UserScoreModal from "../molecules/UserScoreModal";

interface CourseUserReviewProps {
  label: string;
  score: number;
  userScore?: number;
  isLast?: boolean;
  modalMessage: string;
}

const CourseUserReview: React.FC<CourseUserReviewProps> = ({
  label,
  modalMessage,
  score,
  isLast
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [userReview, setUserReview] = useState({
    id: "1",
    userName: "John Smith",
    userTitle: "Scratch Golfer",
    userScore: 6,
    comment: "Loved the greens!",
    commentDate: "2025-08-20"
  });

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
          borderBottomWidth: isLast ? 0 : 1,
          borderBottomColor: "#e0e0e0"
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          {label}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 24 }}>
          <ReviewScore reviewScore={score} />
          <ReviewScore userReviewScore={userReview.userScore} />
        </View>
      </TouchableOpacity>
      <UserScoreModal
        label={label}
        visible={modalVisible}
        initialScore={userReview.userScore}
        onClose={() => setModalVisible(false)}
        message={modalMessage}
        onSave={newScore => {
          setUserReview(prev => ({ ...prev, userScore: newScore }));
        }}
      />
    </View>
  );
};

export default CourseUserReview;
