import React from "react";

const Persons = ({ filteredPersons, handleDeletion }) => (
  <>
    {filteredPersons.map((person) => (
      <div key={person.name}>
        <p>
          {person.name} {person.phone}
        </p>
        <button onClick={() => handleDeletion(person)}>delete</button>
      </div>
    ))}
  </>
);

export default Persons;
