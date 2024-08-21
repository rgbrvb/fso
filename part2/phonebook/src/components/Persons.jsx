const Persons = ({ personsToShow, handleDelete }) => {
    return (
        <>
            {personsToShow.map(person => <div key={person.id}>{person.name} {person.number} <button id={person.id} name={person.name} onClick={handleDelete}>delete</button></div>)}
        </>
    )
}

export default Persons