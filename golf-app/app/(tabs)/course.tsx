import Course from "../../components/pages/course";
import golfCourseData from "../../assets/data/courseData";

export default function CoursePage() {
  return <Course {...golfCourseData} />;
}
