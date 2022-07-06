const CountryList = ({ countries, setFilterText }) => {
    if (countries.length > 10) return (
        <div>Too many matches, specify another filter</div>
    )
    else if (countries.length > 1 && countries.length <= 10) {
        return (
            <div>
                {countries.map((country) => <div key={country.flag}>{country.name.common}<button type="button" onClick={() => setFilterText(country.name.common)}>show</button></div>)}
            </div>
        )
    }
    else return <div>no country</div>
}

export default CountryList;