import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [studentsCount, setStudentsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [enrollmentsCount, setEnrollmentsCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const studentResponse = await axios.get('http://localhost:1425/studentapi/findAll');
        setStudentsCount(studentResponse.data.data.length);

        const courseResponse = await axios.get('http://localhost:1425/courseapi/findAllCourses');
        setCoursesCount(courseResponse.data.data.length);

        const enrollmentsResponse = await axios.get('http://localhost:1425/courseapi/courses/enrollment');
        setEnrollmentsCount(Object.keys(enrollmentsResponse.data).length);
        console.log(enrollmentsCount)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div className="info-box">
        <h2>Number of Students: {studentsCount}</h2>
      </div>
      <div className="info-box">
        <h2>Number of Courses: {coursesCount}</h2>
      </div>
      <div className="info-box">
        <h2>Number of Courses Enrolled: {enrollmentsCount}</h2>
      </div>
    </div>
  );
};

export default Home;
