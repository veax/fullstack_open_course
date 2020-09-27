import React from 'react';

const PersonForm = ({ addPerson, handlePersonInput, person }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handlePersonInput} name="name" value={person.name} />
      </div>
      <div>
        number:{' '}
        <input type="number" name="number" value={person.number} onChange={handlePersonInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
