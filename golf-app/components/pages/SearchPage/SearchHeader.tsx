import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  Easing
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../../../constants/Colors";
import Dialog from "../../organisms/Dialog";

interface SearchHeaderProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  value,
  onChangeText,
  placeholder = "Search..."
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [distanceModalVisible, setDistanceModalVisible] = useState(false);

  const [selectedSort, setSelectedSort] = useState("A-Z");
  const [selectedDistance, setSelectedDistance] = useState("10 miles");

  // Animated values for height and opacity
  const filterHeight = useRef(new Animated.Value(0)).current;
  const filterOpacity = useRef(new Animated.Value(0)).current;

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  useEffect(
    () => {
      Animated.parallel([
        Animated.timing(filterHeight, {
          toValue: showFilters ? 97 : 0, // adjust to match your content height
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false // cannot animate height with native driver
        }),
        Animated.timing(filterOpacity, {
          toValue: showFilters ? 1 : 0,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false
        })
      ]).start();
    },
    [showFilters, filterHeight, filterOpacity]
  );

  const sortOptions = [
    "Distance",
    "A -Z",
    "Z - A",
    "Most Reviews",
    "Community Score",
    "Slope",
    "Rating"
  ];
  const distanceOptions = [
    "10 miles",
    "20 miles",
    "30 miles",
    "50 miles",
    "100 miles",
    "Nationwide"
  ];

  return (
    <View>
      {/* Search Row */}
      <View style={{ flexDirection: "row", gap: 8, paddingBottom: 8 }}>
        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 12,
            paddingHorizontal: 10,
            backgroundColor: theme.colors.lightBgLight,
            flex: 1
          }}
        >
          <Icon
            name="search-outline"
            size={20}
            color="#888"
            style={{ marginRight: 6 }}
          />
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 10,
              fontSize: 16,
              color: "#666"
            }}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
          />
        </View>

        {/* Filter Button */}
        <TouchableOpacity
          onPress={toggleFilters}
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8,
            backgroundColor: showFilters
              ? theme.colors.lightPrimary
              : theme.colors.lightBgLight,
            borderRadius: 12
          }}
        >
          <Image
            source={require("../../../assets/icons/filter.svg")}
            style={{
              width: 20,
              height: 20,
              tintColor: showFilters
                ? theme.colors.lightBgLight
                : theme.colors.lightPrimary
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Animated Filter Options */}
      <Animated.View
        style={{
          height: filterHeight,
          opacity: filterOpacity,
          overflow: "hidden"
        }}
      >
        <View style={{ flexDirection: "column", gap: 8 }}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View
              style={{
                backgroundColor: theme.colors.lightBgLight,
                borderRadius: 12,
                padding: 12,
                flex: 1,
                alignItems: "center"
              }}
            >
              <Text style={{ color: "#666", fontWeight: theme.text.bold }}>
                Sort by
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setSortModalVisible(true)}
              style={{
                backgroundColor: theme.colors.lightBgLight,
                borderRadius: 12,
                padding: 12,
                flex: 2,
                alignItems: "center"
              }}
            >
              <Text style={{ color: "#666" }}>
                {selectedSort}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View
              style={{
                backgroundColor: theme.colors.lightBgLight,
                borderRadius: 12,
                padding: 12,
                flex: 1,
                alignItems: "center"
              }}
            >
              <Text style={{ color: "#666", fontWeight: theme.text.bold }}>
                Within
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setDistanceModalVisible(true)}
              style={{
                backgroundColor: theme.colors.lightBgLight,
                borderRadius: 12,
                padding: 12,
                flex: 2,
                alignItems: "center"
              }}
            >
              <Text style={{ color: "#666" }}>
                {selectedDistance}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {/* Sort Dialog */}
      <Dialog
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
      >
        {sortOptions.map(option =>
          <TouchableOpacity
            key={option}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignItems: "center",
              backgroundColor:
                selectedSort === option
                  ? theme.colors.lightPrimary
                  : "transparent",
              borderRadius: 8,
              marginBottom: 6
            }}
            onPress={() => {
              setSelectedSort(option);
              setSortModalVisible(false);
            }}
          >
            <Text
              style={{
                color:
                  selectedSort === option
                    ? theme.colors.lightSecondary
                    : "#333",
                textAlign: "center"
              }}
            >
              {option}
            </Text>
          </TouchableOpacity>
        )}
      </Dialog>

      {/* Distance Dialog */}
      <Dialog
        visible={distanceModalVisible}
        onClose={() => setDistanceModalVisible(false)}
      >
        {distanceOptions.map(option =>
          <TouchableOpacity
            key={option}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignItems: "center",
              backgroundColor:
                selectedDistance === option
                  ? theme.colors.lightPrimary
                  : "transparent",
              borderRadius: 8,
              marginBottom: 6
            }}
            onPress={() => {
              setSelectedDistance(option);
              setDistanceModalVisible(false);
            }}
          >
            <Text
              style={{
                color:
                  selectedDistance === option
                    ? theme.colors.lightSecondary
                    : "#333",
                textAlign: "center"
              }}
            >
              {option}
            </Text>
          </TouchableOpacity>
        )}
      </Dialog>
    </View>
  );
};

export default SearchHeader;
