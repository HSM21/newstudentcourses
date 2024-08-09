import React, { useState } from 'react';
import axios from '../appConfig'; // Import the configured Axios instance
import './StudentForm.css'; // Import the CSS file

const StudentForm = () => {
  const [student, setStudent] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    emailId: '',
    phNo: '',
    courseIds: ''
  });

  const handleChange = (e) => { 
    console.log('handling change',e);
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log('formatted student',e);
    e.preventDefault();
    const formattedStudent = {
      ...student,
      courseIds: student.courseIds.split(',').map(id => id.trim())
    };
    axios.post('/studentapi/save', formattedStudent)
      .then(response => {
        console.log(response.data);
        setStudent({ studentId: '', firstName: '', lastName: '', emailId: '', phNo: '', courseIds: '' });
      })
      .catch(error => console.error('There was an error saving the student!', error));
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h2>Add Student</h2>
      <label>StudentId :</label>
      <input name="studentId" value={student.studentId} onChange={handleChange} placeholder="Student Id" required /><br/>
      <label>First Name :</label>
      <input name="firstName" value={student.firstName} onChange={handleChange} placeholder="First Name" required /><br/>
      <label>Last Name :</label>
      <input name="lastName" value={student.lastName} onChange={handleChange} placeholder="Last Name" required /><br/>
      <label>Email :</label>
      <input name="emailId" value={student.emailId} onChange={handleChange} placeholder="Email" required /><br/>
      <label>Phone No :</label>
      <input name="phNo" value={student.phNo} onChange={handleChange} placeholder="Phone" required /><br/>
      <label>Course Ids :</label>
      <input name="courseIds" value={student.courseIds} onChange={handleChange} placeholder="Course IDs (comma separated)" /><br/>
      <div>
      <button type="submit">Add</button></div>
    </form>
  );
};

export default StudentForm;
