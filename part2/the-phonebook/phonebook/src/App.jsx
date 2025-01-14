import { useState, useEffect } from 'react'

import contactService from './services/contacts'

import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [nameFilter, setNameFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    contactService.getAll()
      .then(res => setPersons(res))
  }, [])

  const handleFilterInput = (event) => setNameFilter(event.target.value)

  const handleNameInput = (event) => setNewName(event.target.value)

  const handlePhoneInput = (event) => setNewPhone(event.target.value)

  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    const newPerson = {name: newName, number: newPhone}
    const personFound = persons.find(p => p.name === newPerson.name)

    if (personFound) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        contactService.update(personFound.id, newPerson)
          .then(res => {
            showNotification(`${res.name} number updated`, 'success')
            setPersons(persons.map(p => p.id === res.id ? res : p))
            setNewName('')
            setNewPhone('')
          })
          .catch(error => {
            showNotification(`Information on ${newPerson.name} has already been removed from server`, 'failure')
            contactService.getAll()
              .then(res => setPersons(res))
          })
      }
      return
    }

    contactService.create(newPerson)
      .then(res => {
        showNotification(`Added ${res.name}`, 'success')
        setPersons([...persons, res])
        setNewName('')
        setNewPhone('')
      })
      .catch(error => {
        showNotification(error.response.data.error, 'failure')
      })
  }

  const handleRemove = id => {
    const target = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${target.name}?`)) {
      contactService.remove(id)
        .then(res => setPersons(persons.filter(p => p.id != id)))
        .catch(error => {
          showNotification(`Information on ${target.name} has already been removed from server`, 'failure')
          contactService.getAll()
              .then(res => setPersons(res))
        })
    }
  }

  const showNotification = (message, type) => {
    setMessageType(type)
    setMessage(message)
    setTimeout(() => {
      setMessageType(null)
      setMessage(null)
    }, 3000);
  }

  const filteredPersons = nameFilter 
    ? persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase())) 
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <div>
          filter shown with: <input value={nameFilter} onChange={handleFilterInput}/>
      </div>
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={handleFormSubmit} 
        fields={[
          {title: 'name', value: newName, onChange: handleNameInput},
          {title: 'phone', value: newPhone, onChange: handlePhoneInput}
        ]}
      />
      <h2>Numbers</h2>
      <Contacts persons={filteredPersons} handleRemove={handleRemove}/>
    </div>
  )
}

export default App