import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import CourseCard from "../../components/cards/CourseCard";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabaseClient";
import { theme } from "../../constants/Colors";
import Tabs from "../../components/templates/Tabs";

import { LinearGradient } from "expo-linear-gradient";
import SearchHeader from "@/components/pages/SearchPage/SearchHeader";


const PAGE_SIZE = 10;

const SearchPage: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState("rating");
  const [maxDistance, setMaxDistance] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [activeTab, setActiveTab] = React.useState<
      "Courses" | "Location" | "Members"
    >("Courses");

  const insets = useSafeAreaInsets();

  // Fetch courses from Supabase on mount
  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*");

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

    const filtered = courses.filter(
      (course) =>
        (course.name ?? "").toLowerCase().includes(query) ||
        (course.region ?? "").toLowerCase().includes(query) ||
        (course.county ?? "").toLowerCase().includes(query) ||
        (course.address ?? "").toLowerCase().includes(query)
    );

    setFilteredCourses(filtered);
    setVisibleCount(PAGE_SIZE); // reset visible count on new search
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}


  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: insets.top + 16,
         paddingBottom: insets.bottom,
        backgroundColor: theme.colors.lightBgDark,
      }}
    >
      <SearchHeader
        value={searchQuery}
        onChangeText={handleSearchChange}
        placeholder="Search courses, locations..."
      />
      {/* Sections  */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { key: "Courses", label: "Courses" },
          { key: "Location", label: "Location" },
          { key: "Members", label: "Members" }
        ]}
      />
<View style={{ flex: 1 }}>
  {/* FlatList */}
  <FlatList
    data={filteredCourses.slice(0, visibleCount)}
    keyExtractor={(item) => String(item.course_id)}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => (
      <CourseCard
        course={{
          course_id: item.course_id,
          course_name: item.name,
          par: item.par,
          length_yards: item.length,
          county: item.county,
          region: item.region,
        }}
      />
    )}
    contentContainerStyle={{ gap: 12, paddingVertical: 16 }}
    ListFooterComponent={
      visibleCount < filteredCourses.length ? (
        <View
          style={{
            position: "relative",
            alignItems: "center",
            marginTop: -50,
            paddingBottom: insets.bottom,
          }}
        >
          {/* Bottom fade */}
          <LinearGradient
            colors={[hexToRgba(theme.colors.lightBgDark, 1), hexToRgba(theme.colors.lightBgDark, 0)]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 150,
            }}
          />
          <TouchableOpacity
            onPress={handleLoadMore}
            style={{
              backgroundColor: theme.colors.lightPrimary,
              borderWidth: 1,
              paddingHorizontal: 12,
              marginBottom: 8,
              paddingVertical: 8,
              borderRadius: 12,
              borderColor: theme.colors.lightPrimary,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ color: theme.colors.lightSecondary }}>
              Load more
            </Text>
          </TouchableOpacity>
        </View>
      ) : null
    }
  />

  {/* Top fade */}
  <LinearGradient
    colors={[hexToRgba(theme.colors.lightBgDark, 1), hexToRgba(theme.colors.lightBgDark, 0)]}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 20,
      zIndex: 10,
      pointerEvents: "none",
    }}
  />
</View>

    </View>
  );
};

export default SearchPage;
