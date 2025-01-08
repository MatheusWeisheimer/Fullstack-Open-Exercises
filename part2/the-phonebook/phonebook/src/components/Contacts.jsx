import Person from './Person'

const Contacts = ({persons, handleRemove}) => {
    const personsJsx = persons.map(person => (
        <li key={person.id}>
            <Person person={person} handleRemove={handleRemove}/>
        </li>
    ))

    return (
        <ul>
            {personsJsx}
        </ul>
    )
}

export default Contacts