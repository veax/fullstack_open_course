import React, { useState } from "react";
import SearchFilter from "./components/SearchFilter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newPerson, setNewPerson] = useState({ name: "", phone: "" });
  const [filterQuery, setFilterQuery] = useState("");

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filterQuery)
  );

  const handleSearch = (e) => {
    setFilterQuery(e.target.value.toLowerCase());
  };

  const handlePersonInput = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const addPerson = (e) => {
    e.preventDefault();

    if (persons.filter((p) => p.name === newPerson.name).length > 0) {
      alert(`${newPerson.name} is already in a phonebook`);
      return;
    }
    const person = {
      name: newPerson.name,
      phone: newPerson.phone,
    };
    setPersons(persons.concat(person));
    setNewPerson({ name: "", phone: "" });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter handleSearch={handleSearch} />
      <PersonForm
        addPerson={addPerson}
        handlePersonInput={handlePersonInput}
        person={newPerson}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
