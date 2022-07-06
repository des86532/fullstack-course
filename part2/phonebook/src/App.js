import { useState, useEffect } from 'react'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Filter from './component/Filter'
import Notification from './component/Notification'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  const personsToShow = persons.filter((person) => person.name.includes(filterText))

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeNumber = (e) => {
    setNumber(e.target.value)
  }

  const handleChangeFilterText = (e) => {
    setFilterText(e.target.value)
  }

  const handleDelete = ({ id, name }) => {
    if (window.confirm(`Delete ${name}`)) {
      deletePerson(id, name)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length === 0) return

    const personIndex = persons.findIndex((person) => person.name === name)

    if (personIndex > -1) {
      if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(persons[personIndex].id, { name, number })
      }
    } else {
      createPerson()
    }

    setName('')
    setNumber('')
  }

  const createPerson = () => {
    personService.create({
      name,
      number
    }).then((res) => {
      setPersons([...persons, res])
      setMessageType('success')
      setMessage(`Added ${res.name}`)
    })
  }

  const updatePerson = (id, payload) => {
    personService.update(id, payload).then((res) => {
      const result = persons.map((person) => person.id === res.id ? res : person)
      setPersons(result)
      setMessageType('success')
      setMessage(`Updated ${res.name}`)
    }).catch((err) => {
      setMessageType('error')
      setMessage(`Information of ${name} has already been removed from server`)
      getPersons()
    })
  }

  const deletePerson = (id, name) => {
    personService.remove(id).then((res) => {
      setPersons(persons.filter((person) => person.id !== id))
      setMessageType('success')
      setMessage(`Deleted ${name}`)
    }).catch((err) => {
      setMessageType('error')
      setMessage(`Information of ${name} has already been removed from server`)
      getPersons()
    })
  }

  const getPersons = () => {
    personService.getAll().then((res) => {
      setPersons(res)
    })
  }

  useEffect(() => {
    getPersons()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [message])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter
        filterText={filterText}
        handleChangeFilterText={handleChangeFilterText}
      />
      <h3>Add a new</h3>
      <PersonForm
        name={name}
        number={number}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App;