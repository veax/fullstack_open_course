import React, { useState, useEffect } from "react";
import personService from "./PersonService";
import SearchFilter from "./components/SearchFilter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", phone: "" });
  const [filterQuery, setFilterQuery] = useState("");
  const [message, setMessage] = useState(null);

  const popupMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const popupAddPersonMessage = (name) => {
    let message = {
      text: `Added ${name}`,
      type: "success",
    };
    setMessage(message);
    popupMessage();
  };

  const popupPersonNotExistsError = (name) => {
    let message = {
      text: `Information of ${name} has already been removed from server`,
      type: "error",
    };
    setMessage(message);
    popupMessage();
  };

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
            popupAddPersonMessage(changedPerson.name);
          })
          .catch((err) => {
            popupPersonNotExistsError(existingPerson.name);
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
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
      popupAddPersonMessage(person.name);
    });
  };

  const handleDeletion = (person) => {
    if (window.confirm(`delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then((res) => setPersons(persons.filter((p) => p.id !== person.id)))
        .catch((err) => {
          popupPersonNotExistsError(person.name);
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
