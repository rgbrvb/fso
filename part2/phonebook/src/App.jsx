import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data))
  }, [])

  const [persons, setPersons] = useState([])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const personsToShow = filter.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))
    : persons

  const handleSubmit = (e) => {
    e.preventDefault()

    let exist
    for (let i in persons) {
      if (persons[i].name.toLowerCase() === newName.toLowerCase()) {
        exist = true
        break
      }
    }

    if (exist) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one ?`)) {

        const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const updatedPerson = { ...person, number: newNumber }

        personService
          .update(updatedPerson.id, updatedPerson)
          .then(resp => setPersons(persons.map(person => person.id !== resp.id ? person : resp)))
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameInput = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterInput = (e) => {
    setFilter(e.target.value)
  }

  const handleDelete = (e) => {
    if (window.confirm(`Delete ${e.target.name} ?`)) {
      personService
        .remove(e.target.id)
        .then(data => setPersons(persons.filter(person => person.id !== data.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterInput={handleFilterInput} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameInput={handleNameInput} newNumber={newNumber} handleNumberInput={handleNumberInput} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App