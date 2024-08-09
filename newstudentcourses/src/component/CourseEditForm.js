import React, { useState } from 'react';
import axios from 'axios';
import './CourseEditForm.css'; // Import the CSS file

const CourseEditForm = ({ course, onClose, onUpdate }) => {
  const [formValues, setFormValues] = useState({
    duration: course.courseDuration,
    fee: course.courseFee
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/courseapi/modify/${course.courseId}/${formValues.duration}/${formValues.fee}`)
      .then(response => {
        onUpdate(response.data.data); // Adjust based on your actual API response
        onClose();
      })
      .catch(error => console.error('There was an error updating the Course!', error));
  };

  return (
    <div className="edit-form">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <label>Duration :</label>
        <input name="duration" value={formValues.duration} onChange={handleChange} placeholder="Duration" required />
        <label>Fee :</label>
        <input name="fee" value={formValues.fee} onChange={handleChange} placeholder="Fee" required />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default CourseEditForm;
