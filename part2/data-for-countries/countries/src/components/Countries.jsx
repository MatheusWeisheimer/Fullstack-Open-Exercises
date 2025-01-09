import FullCountry from "./FullCountry"

const Countries = ({countries}) => {
    if (countries === null) {
        return null
    }

    const countriesJsx = countries.length > 1
    ? countries.map(c => <li key={c.name.common}>{c.name.common}</li>)
    : <FullCountry country={countries[0]}/>


    return (
        <div>
            {countriesJsx}
        </div>
    )
}

export default Countries