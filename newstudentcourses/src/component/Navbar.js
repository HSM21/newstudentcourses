import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>Student&Courses Management</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/students">Students</Link>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
