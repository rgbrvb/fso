const Persons = ({ filter, filteredPersons, persons }) => {
    return (
        <>
            {filter.length > 0 ?
                filteredPersons.map(person => <div key={person.id}>{person.name} {person.number}</div>) :
                persons.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
        </>
    )
}

export default Persons