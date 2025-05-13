import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/people";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (
      persons.find(
        (person) => person.name === newName && person.number === newNumber
      )
    ) {
      alert(`${newName} is already added to phonebook`);
    } else if (persons.some((person) => newName === person.name)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );
        const updatedPersonObject = { ...personToUpdate, number: newNumber };
        personService
          .update(updatedPersonObject.id, updatedPersonObject)
          .then((returnedPerson) => {
            setPersons(
              persons
                .filter((person) => person.id !== returnedPerson.id)
                .concat(returnedPerson)
            );
          });
      }
    } else {
      const newObject = { name: newName, number: newNumber };
      personService
        .create(newObject)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    }
    setNewName("");
    setNewNumber("");
  };

  const filteredPersons =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  const handleDeleteButton = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deletePerson(id).then((returnedPerson) =>
        setPersons(
          persons.filter((person) => {
            return person.id !== returnedPerson.id;
          })
        )
      );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons}
        handleDeleteButton={handleDeleteButton}
      />
    </div>
  );
};

export default App;

/* 
            setPersons(
              persons.concat(
                persons.map((person) =>
                  person.id === updatedPersonObject.id
                    ? returnedPersons
                    : person
                )
              )
            );
          });

          */
