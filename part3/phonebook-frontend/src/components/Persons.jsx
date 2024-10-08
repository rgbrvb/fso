const Persons = ({ personsToShow, handleDeleteButton }) => {
    return (
        <>
            {personsToShow.map(person => <div key={person.id}>{person.name} {person.number} <button onClick={() => handleDeleteButton(person.id, person.name)}>delete</button></div>)}
        </>
    )
}

export default Persons