import React, { useState } from 'react';

const AddSchoolForm = ({ addSchool }) => {
  const [schoolName, setschoolName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (schoolName) {
      addSchool(schoolName);
      setschoolName('');
    }
  };

//   HTML
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={schoolName}
        onChange={(e) => setschoolName(e.target.value)}
        placeholder="Create New School..."
      />
      <button type="submit">Add Fruit</button>
    </form>
  );
};

export default AddSchoolForm;