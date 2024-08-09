import React, { useEffect, useState } from 'react';
import axios from '../appConfig';
import './StudentTable.css'; // Import the CSS file
import CourseEditForm from './CourseEditForm'; // Import the EditForm component
//import Course from './Course';

const CourseTable = React.forwardRef((props, ref) => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  const fetchCourses = () => {
    axios.get('/courseapi/findAllCourses')
      .then(response => {
        console.log('Courses fetched:', response.data); // Debugging: log fetched data
        setCourses(response.data.data);
      })
      .catch(error => console.error('There was an error fetching the courses!', error));
  };

  useEffect(() => {
    fetchCourses();
  }, []); // Removed dependency to avoid infinite loop

  React.useImperativeHandle(ref, () => ({
    fetchCourses
  }));

  const handleDelete = (id) => {
    axios.delete(`/courseapi/deleteById/${id}`)
      .then(response => {
        setCourses(courses.filter(course => course.courseId !== id));
      })
      .catch(error => console.error('There was an error deleting the course!', error));
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
  };

  const handleUpdate = (updatedCourse) => {
    setCourses(courses.map(course =>
      course.courseId === updatedCourse.courseId ? updatedCourse : course
    ));
  };

  return (
    <div>
      <h2>Courses</h2>
      {editingCourse &&
        <CourseEditForm
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onUpdate={handleUpdate}
        />
      }
      <table>
        <thead>
          <tr>
            <th>CourseId</th>
            <th>Course Name</th>
            <th>Course Faculty</th>
            <th>Course Duration</th>
            <th>Course Fee</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.courseId}>
              <td>{course.courseId}</td>
              <td>{course.courseName}</td>
              <td>{course.courseFaculty}</td>
              <td>{course.courseDuration}</td>
              <td>{course.courseFee}</td>
              <td><button onClick={() => handleEdit(course)}>Edit</button></td>
              <td><button onClick={() => handleDelete(course.courseId)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default CourseTable;
