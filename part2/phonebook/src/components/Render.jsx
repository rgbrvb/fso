const Render = (prop) => {
    return prop.persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)
  }

  export default Render