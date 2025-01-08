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

  useEffect(() => {
    contactService.getAll()
      .then(res => setPersons(res))
  }, [])

  const handleFilterInput = (event) => setNameFilter(event.target.value)

  const handleNameInput = (event) => setNewName(event.target.value)

  const handlePhoneInput = (event) => setNewPhone(event.target.value)

  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    contactService.getAll()
      .then(res => {
        setPersons(res)
         
        const newPerson = {name: newName, number: newPhone}
        const personFound = persons.find(p => p.name === newPerson.name)

        if (personFound) {
          if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
            contactService.update(personFound.id, newPerson)
              .then(res => {
                showNotification(`${res.name} number updated`)
                contactService.getAll()
                  .then(res => {
                    setPersons(res)
                    setNewName('')
                    setNewPhone('')
                  })
              })
          }

          return
        }
    
        contactService.create(newPerson)
          .then(res => {
            showNotification(`Added ${res.name}`)
            setPersons([...persons, res])
            setNewName('')
            setNewPhone('')
          })
      })
  }

  const handleRemove = id => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      contactService.remove(id)
        .then(res => setPersons(persons.filter(p => p.id != res.id)))
    }
  }

  const showNotification = message => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000);
  }

  const filteredPersons = nameFilter 
    ? persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase())) 
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
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