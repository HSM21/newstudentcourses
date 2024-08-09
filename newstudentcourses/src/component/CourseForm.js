import React, { useState } from 'react';
import axios from '../appConfig'; // Import the configured Axios instance
import './CourseForm.css'; // Import the CSS file

const CourseForm = () => {
  const [course, setCourse] = useState({
    courseId: '',
    courseName: '',
    courseFaculty: '',
    courseDuration: '',
    courseFee: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/courseapi/coursesave', course)
      .then(response => {
        console.log(response.data);
        setCourse({courseId:'', courseName: '', courseFaculty: '', courseDuration: '', courseFee: '' });
      })
      .catch(error => console.error('There was an error saving the course!', error));
  };

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <h2>Add Course</h2>
      <label>CourseId :</label>
      <input name="courseId" value={course.courseId} onChange={handleChange} placeholder="Course Id" required /><br/>
      <label htmlFor="courseName">Course Name :</label>
      <input name="courseName" value={course.courseName} onChange={handleChange} placeholder="Course Name" required /><br/>
      <label>Course Faculty :</label>
      <input name="courseFaculty" value={course.courseFaculty} onChange={handleChange} placeholder="Faculty" required /><br/>
      <label>Course Duration :</label>
      <input name="courseDuration" value={course.courseDuration} onChange={handleChange} placeholder="Duration" required /><br/>
      <label>Course Fee :</label>
      <input name="courseFee" value={course.courseFee} onChange={handleChange} placeholder="Fee" required /><br/>
      <div><button type="submit">Add</button></div>
    </form>
  );
};

export default CourseForm;
