import React, { useState } from 'react';

const RemoveSchoolForm = ({ removeSchool }) => {
  const [schoolName, setschoolName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (schoolName) {
      removeSchool(schoolName);
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
        placeholder="Remove a School..."
      />
      <button type="submit">Delete</button>
    </form>
  );
};

export default RemoveSchoolForm;