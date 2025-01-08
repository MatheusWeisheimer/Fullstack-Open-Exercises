import { useState, useEffect } from 'react'

import contactService from './services/contacts'

import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [nameFilter, setNameFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  useEffect(() => {
    contactService.getAll()
      .then(res => setPersons(res))
  }, [])

  const handleFilterInput = (event) => setNameFilter(event.target.value)

  const handleNameInput = (event) => setNewName(event.target.value)

  const handlePhoneInput = (event) => setNewPhone(event.target.value)

  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewPhone('')
      return
    }

    contactService.create({name: newName, number: newPhone})
      .then(res => {
        setPersons([...persons, res])
        setNewName('')
        setNewPhone('')
      })
  }

  const handleRemove = id => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      contactService.remove(id)
        .then(res => setPersons(persons.filter(p => p.id != res.id)))
    }
  }

  const filteredPersons = nameFilter 
    ? persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase())) 
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
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