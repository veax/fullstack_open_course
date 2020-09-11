import React from "react";

const Persons = ({ filteredPersons }) => (
  <>
    {filteredPersons.map((person) => (
      <p key={person.name}>
        {person.name} {person.phone}
      </p>
    ))}
  </>
);

export default Persons;
