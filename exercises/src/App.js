import React, { useState, useEffect } from "react";
import personService from "./PersonService";
import SearchFilter from "./components/SearchFilter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", phone: "" });
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    personService.getAllPersons().then((persons) => {
      setPersons(persons);
    });
  }, []);

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

    let existingPerson = persons.find((p) => p.name === newPerson.name);
    if (existingPerson) {
      if (
        existingPerson.phone !== newPerson.phone &&
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one ?`
        )
      ) {
        personService
          .updatePerson(existingPerson.id, newPerson)
          .then((changedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== changedPerson.id ? p : changedPerson
              )
            );
            setNewPerson({ name: "", phone: "" });
          });
      } else {
        alert(`${newPerson.name} is already in a phonebook`);
      }
      return;
    }

    const person = {
      name: newPerson.name,
      phone: newPerson.phone,
    };
    setPersons(persons.concat(person));
    personService.addPerson(person).then((person) => {
      setPersons(persons.concat(person));
      setNewPerson({ name: "", phone: "" });
    });
  };

  const handleDeletion = (person) => {
    if (window.confirm(`delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then((res) => setPersons(persons.filter((p) => p.id !== person.id)));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter handleSearch={handleSearch} />
      <h4>Add a new:</h4>
      <PersonForm
        addPerson={addPerson}
        handlePersonInput={handlePersonInput}
        person={newPerson}
      />
      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        handleDeletion={handleDeletion}
      />
    </div>
  );
};

export default App;
