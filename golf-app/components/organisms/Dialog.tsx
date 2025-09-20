import React from "react";
import { Modal, View, Pressable } from "react-native";
import { theme } from "../../constants/Colors";

const Dialog: React.FC<{
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ visible, onClose, children }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1, // fill the screen
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "center", // center vertically
          alignItems: "center" // center horizontally
        }}
      >
        {/* Backdrop – full screen click area */}
        <Pressable
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
          onPress={onClose}
        />

        {/* Dialog box */}
        <View
          style={{
            backgroundColor: theme.colors.lightBgLight,
            borderRadius: 12,
            padding: 16,
            alignSelf: "center",
            minWidth: "70%", // keeps it from being tiny
            maxWidth: "90%" // keeps it from overflowing
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default Dialog;
