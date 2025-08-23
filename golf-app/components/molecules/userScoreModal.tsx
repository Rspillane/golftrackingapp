import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";

interface UserScoreModalProps {
  visible: boolean;
  initialScore: number;
  onClose: () => void;
  onSave: (newScore: number) => void;
  label: string;
  message: string;
}

const UserScoreModal: React.FC<UserScoreModalProps> = ({
  visible,
  initialScore,
  label,
  message,
  onClose,
  onSave
}) => {
  const [tempScore, setTempScore] = useState(initialScore);

  // Reset score when modal opens
  useEffect(
    () => {
      setTempScore(initialScore);
    },
    [visible, initialScore]
  );

  const handleSave = () => {
    onSave(tempScore);
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.content}>
            {/* Close icon */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
            {/* Title */}
            <Text style={styles.title}>
              {label}
            </Text>
            {/* Message */}
            <Text style={styles.message}>
              {message}
            </Text>

            {/* Preview Number */}
            <Text style={styles.scoreText}>
              {tempScore}
            </Text>

            {/* Star Selector */}
            <View style={styles.starsContainer}>
              {Array.from({ length: 5 }, (_, i) => {
                const starValue = i + 1;
                const filled = starValue <= tempScore;
                return (
                  <Pressable
                    key={starValue}
                    onPress={() => setTempScore(starValue)}
                    style={styles.starButton}
                  >
                    <Text style={[styles.star, filled && styles.filledStar]}>
                      ★
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <Pressable
                style={[styles.actionButton, { backgroundColor: "#61a403ff" }]}
                onPress={handleSave}
              >
                <Text style={{ color: "#fff" }}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 8
  },
  closeIcon: {
    fontSize: 18,
    fontWeight: "bold"
  },
  content: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center"
  },
  title: { fontSize: 36, fontWeight: "500", marginBottom: 12 },
  message: {
    fontSize: 14,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 300
  },
  scoreText: { fontSize: 100, fontWeight: "700", marginBottom: 16 },
  starsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20
  },
  starButton: {
    margin: 4
  },
  star: {
    fontSize: 30,
    color: "#ccc"
  },
  filledStar: {
    color: "#FFD700"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 10
  },
  actionButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 10
  }
});

export default UserScoreModal;
