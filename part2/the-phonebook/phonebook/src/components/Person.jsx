const Person = ({person, handleRemove}) => {
    return (
        <>
            <p>{person.name} {person.number}</p>
            <button onClick={() => handleRemove(person.id)}>remove</button>
        </>
    )
}

export default Person