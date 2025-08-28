import { Stack } from "expo-router";
import React from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { UserReviewsProvider } from "../contexts/UserReviewsContext";

function RootLayoutNav() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated
        ? // Show tabs when authenticated
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        : // Show login when not authenticated
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserReviewsProvider>
        <RootLayoutNav />
      </UserReviewsProvider>
    </AuthProvider>
  );
}
