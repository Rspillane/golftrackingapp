import React, { useState, useMemo } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import MiniReviewCard from "../../components/organisms/MiniReviewCard";
import Disclosure from "../../components/organisms/Disclosure";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DistanceSlider from "../../components/molecules/DistanceSlider";
import CustomDropDown from "../../components/molecules/CustomDropDown";

// Import your data
import courses from "../../assets/data/courses.json";

const SearchPage: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState("rating");
  const [maxDistance, setMaxDistance] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses.slice(0, 20)); // initially first 20

  const insets = useSafeAreaInsets();

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);

    const filtered = courses
      .filter(course =>
        course.course_name.toLowerCase().includes(text.toLowerCase())
      )
      .slice(0, 20); // only show first 20 matches

    setFilteredCourses(filtered);
  };

  // Filter + limit to 20 results
  // const filteredCourses = useMemo(
  //   () => {
  //     let result = courses;

  //     if (searchQuery.trim()) {
  //       const query = searchQuery.toLowerCase();
  //       result = result.filter(
  //         c =>
  //           c.course_name.toLowerCase().includes(query) ||
  //           c.county.toLowerCase().includes(query) ||
  //           c.region.toLowerCase().includes(query)
  //       );
  //     }

  //     return result.slice(0, 20);
  //   },
  //   [searchQuery]
  // );

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
        <Icon
          name="search-outline"
          size={20}
          color="#888"
          style={{ marginRight: 6 }}
        />
        <TextInput
          style={{ flex: 1, paddingVertical: 10, fontSize: 16 }}
          placeholder="Search courses..."
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>

      {/* Filters (hidden by default inside disclosure) */}
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

      {/* Results */}
      <Text style={{ fontSize: 16, fontWeight: "500", marginVertical: 8 }}>
        Results ({filteredCourses.length})
      </Text>

      <FlatList
        data={filteredCourses}
        renderItem={({ item }) =>
          <MiniReviewCard
            course={{
              course_id: item.course_id,
              course_name: item.course_name,
              par: item.par,
              length_yards: item.length_yards,
              holes: item.holes
            }}
          />
        // <- update MiniReviewCard to take `course` object instead of split props
        }
        contentContainerStyle={{ gap: 12, paddingBottom: 50 }}
      />
    </View>
  );
};

export default SearchPage;
