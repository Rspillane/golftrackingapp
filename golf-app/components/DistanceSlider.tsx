import React, { useState } from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

interface DistanceSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onValueChange: (val: number) => void;
}

const DistanceSlider: React.FC<DistanceSliderProps> = ({
  min = 1,
  max = 100,
  step = 1,
  value = 10,
  onValueChange
}) => {
  const [distance, setDistance] = useState(value);

  return (
    <View style={{ marginVertical: 20, paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>
        Distance: {distance} km
      </Text>

      <Slider
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={distance}
        minimumTrackTintColor="#517f01ff"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#517f01ff"
        onValueChange={val => {
          setDistance(val);
          onValueChange(val);
        }}
      />
    </View>
  );
};

export default DistanceSlider;
