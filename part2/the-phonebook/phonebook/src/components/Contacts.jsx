import Person from './Person'

const Contacts = ({persons}) => {
    const personsJsx = persons.map(person => <li key={person.id}><Person person={person}/></li>)

    return (
        <ul>
            {personsJsx}
        </ul>
    )
}

export default Contacts