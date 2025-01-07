import { useState } from 'react'

import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [nameFilter, setNameFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

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