const FullCountry = ({country}) => {
    const languagesJsx = Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>Languages:</h3>
            <ul>{languagesJsx}</ul>
            <img src={country.flags.png}/>
        </div>
    )
}

export default FullCountry