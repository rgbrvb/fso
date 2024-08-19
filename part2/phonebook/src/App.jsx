import { useState, useEffect } from 'react'
import Render from './components/Render'
import Form from './components/Form'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    let contain = false

    for (const person of persons) {
      contain = newName === person.name
      if (contain) {
        break
      }
    }

    if (contain) {
      alert(`${newName} is already added in the phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
    }

    setNewName('')
    setNewNumber('')
    setFilteredPersons([])
  }

  const handleNameInput = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterInput = (e) => {
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterInput={handleFilterInput} />
      <h2>add a new</h2>
      <Form newName={newName} newNumber={newNumber} handleNumberInput={handleNumberInput} handleNameInput={handleNameInput} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Render persons={filteredPersons.length > 0 ? filteredPersons : persons} />
    </div>
  )
}

export default App