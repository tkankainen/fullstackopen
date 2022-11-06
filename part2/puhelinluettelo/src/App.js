import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(false) //true
  const [notification, setNotification] = useState('')
  const [errormessage, setErrormessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    const person = persons.find(person => person.name === newName)

    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(person.id, newObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNotification(`Updated ${person.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          })
          .catch(error => {
            setErrormessage(`Information of ${person.name} has already been removed from server`)
            setTimeout(() => {
              setErrormessage(null)
            }, 5000)
          }) 
          setPersons(persons.filter(p => p.id !== person.id)) 
      }
    
      } else {
        personService
            .create(newObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
            })
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${newName}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
      }   
    }
  

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirm = window.confirm(`Delete ${person.name}?`)

    if (confirm) {
      personService
        .deleteperson(id)
        .then(returnedPerson => {
          persons.map(person => person.id !== id ? person : returnedPerson)
          setNotification(`Deleted ${person.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setErrormessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setErrormessage(null)
          }, 5000)
        })
        setPersons(persons.filter(person => person.id !== id))
    }
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} error={false}/>
      <Notification message={errormessage} error={true}/>
      <Filter 
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )

}

export default App
