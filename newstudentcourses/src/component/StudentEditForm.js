import React, { useState } from 'react';
import axios from 'axios';
import './StudentEditForm.css'; // Import the CSS file

const StudentEditForm = ({ student, onClose, onUpdate }) => {
  const [formValues, setFormValues] = useState({
    mailId: student.emailId,
    phoneNo: student.phNo
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/studentapi/modify/${student.studentId}/${formValues.mailId}/${formValues.phoneNo}`)
      .then(response => {
        onUpdate(response.data); // Ensure this is the correct way to access the response data
        onClose();
      })
      .catch(error => console.error('There was an error updating the student!', error));
  };

  return (
    <div className="edit-form">
      <h2>Edit Student</h2>
      <form>
        <label>Email :</label>
        <input name="mailId" value={formValues.mailId} onChange={handleChange} placeholder="Email" required />
        <label>Phone No :</label>
        <input name="phoneNo" value={formValues.phoneNo} onChange={handleChange} placeholder="Phone" required />
        <button type="button" onClick={handleSubmit}>Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default StudentEditForm;
