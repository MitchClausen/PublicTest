import React, { useEffect, useState } from 'react';
import api from "../api.js";
import AddSchoolForm from './AddSchoolForm.jsx';
import RemoveSchoolForm from './RemoveSchools.jsx';

const SchoolList = () => {
  const [schools, setSchools] = useState([]);

//   GET Request
  const fetchSchools = async () => {
    try {
      const response = await api.get('/getSchoolsLocal');
      setSchools(response.data.schools);
    } catch (error) {
      console.error("Error fetching schools", error);
    }
  };

//   POST Request
  const addSchool = async (schoolName) => {
    try {
      await api.post('/postSchoolLocal', { name: schoolName });
      fetchSchools();  // Refresh the list after adding a school
    } catch (error) {
      console.error("Error adding school", error);
    }
  };
  

// ---------------------- TODO ----------------------
//   POST Remove Request
  const removeSchool = async (schoolName) => {
    try {
      await api.post('/removeSchoolLocal', { name: schoolName });
      fetchSchools();  // Refresh the list after adding a school
    } catch (error) {
      console.error("Error removing school", error);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <div>
      <h2>School List</h2>
      <ul>
        {schools.map((school, index) => (
          <li key={index}>{school.name}</li>
        ))}
      </ul>
      <AddSchoolForm addSchool={addSchool} />
      <RemoveSchoolForm removeSchool={removeSchool} />
    </div>
  );
};

export default SchoolList;