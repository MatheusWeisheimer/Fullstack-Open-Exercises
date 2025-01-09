import { useState, useEffect } from "react"
import countriesService from "./services/countriesService"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState(null)
  const [input, setInput] = useState('')
  const [tooMannyCountries, setTooMannyCountries] = useState(false)

  const saveCountries = (array) => {
    if (array.length > 10) {
      setTooMannyCountries(true)
      setCountries(null)
      return
    }

    setTooMannyCountries(false)
    setCountries(array)
  }

  useEffect(() => {
    if (input === '') {
      setTooMannyCountries(false)
      setCountries(null)
      return
    }

    countriesService.getCountries(input)
      .then(res => saveCountries(res))
      .catch(error => console.log(error.message))
  }, [input])

  return (
    <div>
      <div>
        find countries <input value={input} onChange={(e) => setInput(e.target.value)}/>
      </div>
      {tooMannyCountries && <p>Too many matches, specify another filter</p>}
      <Countries countries={countries}/>
    </div>
  )
}

export default App