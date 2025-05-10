import { useState } from "react"
import { useMutation } from "@apollo/client"

import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"

const BirthForm = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
    })

    const submit = (e) => {
        e.preventDefault()
        updateAuthor({ variables: { name, born: parseInt(born) } })

        console.log('update author...')

        setName('')
        setBorn('')
    }

    return (
        <>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <input
                        value={name}
                        onChange={({target}) => setName(target.value)}
                    />
                </div>
                <div>
                    born
                    <input 
                        type='number' 
                        value={born}
                        onChange={({target}) => setBorn(target.value)}
                    />
                </div>
                <button>update author</button>
            </form>
        </>
    )
}

export default BirthForm