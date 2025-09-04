import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import MiniReviewCard from "../../components/organisms/MiniReviewCard";
import Disclosure from "../../components/organisms/Disclosure";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DistanceSlider from "../../components/molecules/DistanceSlider";
import CustomDropDown from "../../components/molecules/CustomDropDown";

// Import Supabase client
import { supabase } from "../../lib/supabaseClient"

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
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 16
      }}
    >
      {/* Search bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          paddingHorizontal: 10,
          backgroundColor: "#f9f9f9",
          marginBottom: 12
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

      {/* Filters */}
      <Disclosure title="Filters">
        <CustomDropDown
          label="Sort by"
          selectedValue={selectedSort}
          onValueChange={setSelectedSort}
          options={[
            { label: "Overall Rating", value: "rating" },
            { label: "Teeboxes", value: "teeboxes" },
            { label: "Greens", value: "greens" },
            { label: "Fairways", value: "fairways" },
            { label: "Facilities", value: "facilities" },
            { label: "Clubhouse", value: "clubhouse" },
            { label: "Value", value: "value" }
          ]}
        />
        <DistanceSlider
          min={1}
          max={100}
          step={1}
          value={maxDistance}
          onValueChange={setMaxDistance}
        />
      </Disclosure>

      <Text style={{ fontSize: 16, fontWeight: "500", marginVertical: 8 }}>
        Results ({filteredCourses.length})
      </Text>

      <FlatList
        data={filteredCourses}
        renderItem={({ item }) => (
          <MiniReviewCard
            course={{
              course_id: item.course_id,
              course_name: item.name,
              par: item.par,
              length_yards: item.length,
              // remove holes if not in your table
            }}
          />
        )}
        contentContainerStyle={{ gap: 12, paddingBottom: 50 }}
      />
    </View>
  );
};

export default SearchPage;
