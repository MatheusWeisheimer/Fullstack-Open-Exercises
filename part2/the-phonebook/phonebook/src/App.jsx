import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

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

  const personsJsx = persons.map(person => <li key={person.id}>{person.name} {person.phone}</li>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInput}/>
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsJsx}
      </ul>
    </div>
  )
}

export default App