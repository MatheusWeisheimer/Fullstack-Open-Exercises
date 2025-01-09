import { useState } from "react"
import FullCountry from "./FullCountry"

const Country = ({country}) => {
    const [showFull, setShowFull] = useState(false)

    const toggleShowFull = () => {
        setShowFull(!showFull)
    }

    if (showFull) {
        return (
            <div>
                <FullCountry country={country}/>
                <button onClick={toggleShowFull}>hide</button>
            </div>
        )
    }

    return (
        <div>
            <p>
                {country.name.common}
                <button onClick={toggleShowFull}>show</button>
            </p>
        </div>
    )
}

export default Country