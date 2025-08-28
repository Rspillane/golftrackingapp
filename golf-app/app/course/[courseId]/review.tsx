import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ReviewPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Write Your Review
      </Text>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 20,
          padding: 12,
          backgroundColor: "#3e9114ff",
          borderRadius: 10
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
