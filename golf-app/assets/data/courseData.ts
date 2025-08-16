import { green } from "react-native-reanimated/lib/typescript/Colors";

const golfCourseData = {
  id: 1,
  score: 10,
  address: "2604 Washington Rd, Augusta, GA 30904, United States",
  holes: 18,
  title: "Augusta National Golf Club",
  par: "72",
  website: "https://www.masters.com",
  range: true,
  greenfee: {
    low: 500,
    high: 1000
  },
  image:
    "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop",
  reviewItems: [
    { label: "Green Fee", value: 500 },
    { label: "Pace of Play", value: "4 hours" },
    { label: "Teeboxes", value: 10 },
    { label: "Fairways", value: 10 },
    { label: "Greens", value: 10 },
    { label: "Clubhouse", value: 10 },
    { label: "Facilities", value: 10 }
  ]
};

export default golfCourseData;
