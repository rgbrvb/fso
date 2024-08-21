import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(resp => setPersons(resp.data))
  }, [])

  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
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
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterInput={handleFilterInput} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameInput={handleNameInput} newNumber={newNumber} handleNumberInput={handleNumberInput} />
      <h2>Numbers</h2>
      <Persons filter={filter} filteredPersons={filteredPersons} persons={persons} />
    </div>
  )
}

export default App