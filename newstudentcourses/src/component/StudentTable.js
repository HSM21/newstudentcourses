import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './StudentTable.css'; // Import the CSS file
import StudentEditForm from './StudentEditForm';
// Import the EditForm component

const StudentTable = React.forwardRef((props, ref) => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = () => {
    axios.get('http://localhost:1425/studentapi/findAll')
      .then(response => setStudents(response.data.data))
      .catch(error => console.error('There was an error fetching the students!', error));
  };

  useEffect(() => {
    fetchStudents();
  }, [students]); // Only fetch students once when the component mounts

  React.useImperativeHandle(ref, () => ({
    fetchStudents
  }));

  const handleDelete = (id) => {
    axios.delete(`http://localhost:1425/studentapi/deleteById/${id}`)
      .then(response => {
        setStudents(prevStudents => prevStudents.filter(student => student.studentId !== id));
      })
      .catch(error => console.error('There was an error deleting the student!', error));
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleUpdate = (updatedStudent) => {
    if (updatedStudent && updatedStudent.studentId) {
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.studentId === updatedStudent.studentId ? updatedStudent : student
        )
      );
      // Close the edit form after updating
      setEditingStudent(null);
    } else {
      console.error("Updated student is undefined or missing studentId", updatedStudent);
    }
  };

  return (
    <div>
      <h2>Students</h2>
      {editingStudent &&
        <StudentEditForm
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onUpdate={handleUpdate}
        />
      }
      <table>
        <thead>
          <tr>
            <th>StudentId</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Courses</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.emailId}</td>
              <td>{student.phNo}</td>
              <td>{(student.courseIds || []).join(', ')}</td> {/* Handle null or undefined courseIds */}
              <td><button onClick={() => handleEdit(student)}>Edit</button></td>
              <td><button onClick={() => handleDelete(student.studentId)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default StudentTable;
