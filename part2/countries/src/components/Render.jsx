const Render = ({ countriesToShow }) => {
    if (countriesToShow.length === 1) {

        const country = countriesToShow[0]
        return (
            <>
                <h1 key={country.name.common}>{country.name.common}</h1>
                <div>{`capital ${country.capital}`}</div>
                <div>{`area ${country.area}`}</div>
                <h3>languages:</h3>
                <ul>
                    {Object.entries(country.languages).map(key => <li key={key[0]}>{key[1]}</li>)}
                </ul>
                <img src={country.flags.png} alt="" />
            </>
        )
    } else if (countriesToShow.length < 11) {
        return (
            <>
                {countriesToShow.map(country => <div key={country.name.common}>{country.name.common}</div>)}
            </>
        )
    } else if (countriesToShow.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    }
}

export default Render
