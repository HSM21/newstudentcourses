import React, { useState } from 'react';
import StudentTable from './StudentTable';
import StudentForm from './StudentForm.js';


const Students = () => {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };
  return (
    <div>
      <h1>Students Page</h1>
      
      <StudentTable/>
      <button onClick={() => setShowForm(true)}>Add Student</button>
      {showForm && (
        <StudentForm
          onClose={() => setShowForm(false)}
          onAdd={handleAddStudent}
        />
      )}
    </div>
  );
};

export default Students;
