import React ,{useState} from 'react'
import CourseTable from './CourseTable';
import CourseForm from './CourseForm';

function Course() {
  const [showcForm, setShowcForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };
  return (
    <div>
      <h1>Courses Page</h1>
      <CourseTable/>
      <button onClick={() => setShowcForm(true)}>Add Course</button>
      {showcForm && (
        <CourseForm
          onClose={() => setShowcForm(false)}
          onAdd={handleAddCourse}
        />
      )}
    </div>
  );
}

export default Course;
