import { useState, useEffect } from 'react'
import axios from 'axios'

import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [nameFilter, setNameFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
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

    setPersons([...persons, {name: newName, phone: newPhone, id: persons.length + 1}])
    setNewName('')
    setNewPhone('')
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
      <Contacts persons={filteredPersons}/>
    </div>
  )
}

export default App