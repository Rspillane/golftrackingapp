// app/login.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      login();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            flex: 1,
            paddingTop: insets.top + 40,
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: 24
          }}
        >
          {/* App Logo/Title Section */}
          <View
            style={{
              alignItems: "center",
              marginBottom: 60,
              flex: 1,
              justifyContent: "center",
              maxHeight: 200
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#007AFF",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24
              }}
            >
              <Text style={{ fontSize: 32, color: "white" }}>⛳</Text>
            </View>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: "#000",
                marginBottom: 8
              }}
            >
              Golf Tracker
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#666",
                textAlign: "center"
              }}
            >
              Track your rounds, discover new courses
            </Text>
          </View>

          {/* Login Form */}
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#000",
                marginBottom: 32,
                textAlign: "center"
              }}
            >
              Welcome Back
            </Text>

            {/* Email Input */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#000",
                  marginBottom: 8
                }}
              >
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                style={{
                  borderWidth: 1,
                  borderColor: "#e0e0e0",
                  borderRadius: 12,
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  backgroundColor: "#f9f9f9"
                }}
              />
            </View>

            {/* Password Input */}
            <View style={{ marginBottom: 32 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#000",
                  marginBottom: 8
                }}
              >
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
                autoComplete="password"
                style={{
                  borderWidth: 1,
                  borderColor: "#e0e0e0",
                  borderRadius: 12,
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  backgroundColor: "#f9f9f9"
                }}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              style={{
                backgroundColor: isLoading ? "#ccc" : "#007AFF",
                borderRadius: 12,
                paddingVertical: 18,
                alignItems: "center",
                marginBottom: 16
              }}
            >
              {isLoading
                ? <ActivityIndicator color="white" />
                : <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "600"
                    }}
                  >
                    Log In
                  </Text>}
            </TouchableOpacity>

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={{ alignItems: "center", marginBottom: 20 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#007AFF",
                  fontWeight: "500"
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#666"
                }}
              >
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#007AFF",
                    fontWeight: "600"
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
