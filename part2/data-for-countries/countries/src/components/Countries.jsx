import Country from "./Country"
import FullCountry from "./FullCountry"

const Countries = ({countries}) => {
    if (countries === null) {
        return null
    }

    const countriesJsx = countries.length > 1
    ? countries.map(c => <Country key={c.name.common} country={c}/>)
    : <FullCountry country={countries[0]}/>


    return (
        <div>
            {countriesJsx}
        </div>
    )
}

export default Countries