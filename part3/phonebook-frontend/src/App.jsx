import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(res => setPersons(res))
  }, [])

  const handleNameInput = e => setNewName(e.target.value)
  const handleNumberInput = e => setNewNumber(e.target.value)
  const handleFilterInput = e => setNewFilter(e.target.value)

  const handleForm = (e) => {
    e.preventDefault()

    const person = {
      name: newName,
      number: newNumber
    }

    const personAlreadyAdded = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (personAlreadyAdded) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personAlreadyAdded.number = newNumber
        personService
          .update(personAlreadyAdded.id, personAlreadyAdded)
          .then(res => setPersons(persons.map(person => person.id !== res.id ? person : res)))
      }
    } else {
      personService
        .create(person)
        .then(res => {
          setPersons(persons.concat(res))
          setMessage(`Added ${newName}`)
          setError(false)

          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(err => {
          setError(true)
          setMessage(err.response.data.error)

          setTimeout(() => {
            setError(false)
            setMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const personsToShow = newFilter > 0
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  const handleDeleteButton = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(res => setPersons(persons.filter(person => person.id !== id)))
        .catch(err => {
          setError(true)
          setMessage(`Information of ${name} has already been removed from server`)

          setPersons(persons.filter(person => person.id !== id))

          setTimeout(() => {
            setError(false)
            setMessage(null)
          }, 5000);
        })
    }
  }

  return (
    <div onSubmit={handleForm}>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter newFilter={newFilter} handleFilterInput={handleFilterInput} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDeleteButton={handleDeleteButton} />
    </div>
  )
}

export default App