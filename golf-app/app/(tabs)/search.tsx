import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import CourseCard from "../../components/cards/CourseCard"
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabaseClient"

import { theme } from "../../constants/Colors";

const SearchPage: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState("rating");
  const [maxDistance, setMaxDistance] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

  const insets = useSafeAreaInsets();

  // Fetch courses from Supabase on mount
// Initially fetch all courses
useEffect(() => {
  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*"); // fetch all courses

    if (error) {
      console.error("Error fetching courses:", error);
    } else {
      setCourses(data || []);
      setFilteredCourses(data || []); // show all initially
    }
  };

  fetchCourses();
}, []);


const handleSearchChange = (text: string) => {
  setSearchQuery(text);
  const query = text.toLowerCase();

  const filtered = courses.filter(course =>
    (course.name ?? "").toLowerCase().includes(query) ||
    (course.region ?? "").toLowerCase().includes(query) ||
    (course.county ?? "").toLowerCase().includes(query) ||
    (course.address ?? "").toLowerCase().includes(query)
  );

  setFilteredCourses(filtered); // show all matches
};


  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 16,
        backgroundColor: theme.colors.lightBgDark
      }}
    >
      <View style={{flexDirection: "row", gap: 12}}>
      {/* Search bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 12,
          paddingHorizontal: 10,
          backgroundColor: theme.colors.lightBgLight,
          flexGrow: 1
        }}
      >
        <Icon name="search-outline" size={20} color="#888" style={{ marginRight: 6 }} />
        <TextInput
          style={{ flex: 1, paddingVertical: 10, fontSize: 16 }}
          placeholder="Search courses..."
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>
        <TouchableOpacity 
          style={{
              justifyContent: "center", 
              alignItems: "center", 
              paddingHorizontal: 8, 
              backgroundColor: theme.colors.lightBgLight,
              borderRadius: 12
            }}>
          <Image
            source={require("../../assets/icons/filter.svg")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 16, fontWeight: "500", marginVertical: 8 }}>
        Results ({filteredCourses.length})
      </Text>

      <FlatList
        data={filteredCourses}
        renderItem={({ item }) => (
          <CourseCard
            course={{
              course_id: item.course_id,
              course_name: item.name,
              par: item.par,
              length_yards: item.length,
            }}
          />
        )}
        contentContainerStyle={{ gap: 12, paddingBottom: 50 }}
      />
    </View>
  );
};

export default SearchPage;
