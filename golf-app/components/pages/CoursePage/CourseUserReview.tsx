import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ReviewScore from "../../molecules/ReviewScore";
import UserScoreModal from "../../molecules/UserScoreModal";

interface CourseUserReviewProps {
  label: string;
  score: number;        // average/global score
  userScore?: number;   // user’s personal score (from parent/context)
  isLast?: boolean;
  modalMessage: string;
  onSaveUserScore: (newScore: number) => void; // callback to parent
}

const CourseUserReview: React.FC<CourseUserReviewProps> = ({
  label,
  modalMessage,
  score,
  userScore,
  isLast,
  onSaveUserScore
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      {/* Row */}
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
        <Text style={{ fontSize: 16, fontWeight: "500" }}>{label}</Text>

        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 24 }}>
          <Text style={{letterSpacing: 12, color: "green", fontSize: 18}}>{'★'.repeat(userScore ?? 0)}</Text>
        </View>
      </TouchableOpacity>

      {/* Modal */}
      <UserScoreModal
        label={label}
        visible={modalVisible}
        initialScore={userScore ?? 0}
        onClose={() => setModalVisible(false)}
        message={modalMessage}
        onSave={(newScore) => {
          onSaveUserScore(newScore);  // bubble to parent
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default CourseUserReview;
