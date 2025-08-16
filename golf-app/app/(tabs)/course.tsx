import Course from "../../pages/course";
export default function CoursePage() {
  const golfCourseData = {
    id: 1,
    value: 10,
    address: "2604 Washington Rd, Augusta, GA 30904, United States",

    title: "Augusta National Golf Club",
    par: "72",
    website: "https://www.masters.com",
    range: true,
    image:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop",
    reviewItems: [
      { label: "Value", value: 10 },
      { label: "Green Fee", value: 500 },
      { label: "Pace of Play", value: "4 hours" },
      { label: "Teeboxes", value: 10 },
      { label: "Fairways", value: 10 },
      { label: "Greens", value: 10 },
      { label: "Clubhouse", value: 10 },
      { label: "Facilities", value: 10 }
    ]
  };

  return <Course {...golfCourseData} />;
}
