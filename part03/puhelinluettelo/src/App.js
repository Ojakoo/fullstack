
import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import NameForm from './components/NameForm'
import NumberForm from './components/NumberForm'
import personsService from './services/persons'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ currentFilter, setFilter] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null) 
  const [ notErrorMessage, setNotErrorMessage ] = useState(null) 

  useEffect(() => {
    personsService 
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

  const addPersons = (event) => {
    event.preventDefault()

    if (persons.some( person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personsObject = {
          name: newName,
          number: newNumber,
        }
        
        personsService
          .update(persons.find(person => person.name === newName).id, personsObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotErrorMessage(`changed the number of ${returnedPerson.name}`)
          })
          .then( setTimeout(() => {
              setNotErrorMessage(null)
            }, 5000)
          )
          .catch(error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }  
    }
    else {
      
      const personsObject = {
        name: newName,
        number: newNumber,
      }
      
      personsService
        .add(personsObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotErrorMessage(`Added ${returnedPerson.name} to phonebook.`)
        })
        .then( 
          setTimeout(() => {setNotErrorMessage(null) }, 5000) 
        )
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const removePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      const removeName = persons.find(person => person.id === id).name
      
      personsService
        .remove(id)
        .then(error => {
          setNotErrorMessage(`Removed ${removeName} from phonebook.`) 
          setTimeout(() => { setNotErrorMessage(null) }, 5000) 
        })
        .then(handle => {
          setPersons(persons.filter(person => person.name !== removeName))
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => { 
            setErrorMessage(null) 
          }, 5000)}
        )
    }
    
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = currentFilter === ''
  ? persons
  : persons.filter(person => person.name.toUpperCase().includes(currentFilter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type='errorBad'/>
      <Notification message={notErrorMessage} type='errorGood' />
      <Filter handleFilterChange={handleFilterChange} currentFilter={currentFilter} />
      <h2>add a new</h2>
      <form onSubmit={addPersons}>
        <NameForm newName={newName} handleNameChange={handleNameChange} />
        <NumberForm newNumber={newNumber} handleNumberChange={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} removePerson={removePerson}/>
    </div>
  )

}

export default App