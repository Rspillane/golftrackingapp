import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";
import MiniReviewCard, {
  MiniReviewCardProps
} from "../../components/MiniReviewCard";

import Disclosure from "../../components/Disclosure";
import Icon from "react-native-vector-icons/Ionicons";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import DistanceSlider from "../../components/DistanceSlider";
import CustomDropDown from "../../components/CustomDropDown";

const SearchPage: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState("rating");
  const [maxDistance, setMaxDistance] = useState(20);

  const insets = useSafeAreaInsets();

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          paddingHorizontal: 10,
          backgroundColor: "#f9f9f9"
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
          placeholder="Search location"
        />
      </View>
      <Disclosure title="Filters">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 10,
            backgroundColor: "#f9f9f9"
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
          />
        </View>
        {/* Sort Options */}
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
          onValueChange={val => setMaxDistance(val)}
        />;
      </Disclosure>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 16
        }}
      />
      {/* Results */}
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 6 }}>
        Results
      </Text>
      {/* <FlatList
        data={}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <MiniReviewCard
            courseName={item.name}
            courseSubtitle={item.courseSubtitle}
            reviewDate={item.reviewDate}
            yardage={item.yardage}
            par={item.par}
            // distance={item.distance}
          />}
      /> */}
    </View>
  );
};

export default SearchPage;
