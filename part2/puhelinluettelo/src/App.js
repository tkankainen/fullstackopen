import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(false) //true

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    persons.find(element => element.name === newName)
    ? alert(`${newName} is already added to phonebook`)
    : setPersons(persons.concat(newObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.includes(filter))

  const Filter = () => {
    return (
      <div>filter shown with <input 
        value={filter}
        onChange={handleFilterChange}
        />
      </div>
    )
  }

  const PersonForm = () => {
    return (
      <form onSubmit={addPerson}>
        <div>name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  const Persons = () => {
    return (
    personsToShow.map(person =>
      <p key={person.name}>{person.name} {person.number}</p>
      )
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter />
      <h3>Add a new</h3>
      <PersonForm />
      <h3>Numbers</h3>
      <Persons />
    </div>
  )
}

export default App
