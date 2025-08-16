import Course from "../../pages/course";
export default function CoursePage() {
  const golfCourseData = {
    id: 1,
    title: "Augusta National Golf Club",
    par: "72",
    website: "https://www.masters.com",
    range: true
  };

  return <Course {...golfCourseData} />;
}
