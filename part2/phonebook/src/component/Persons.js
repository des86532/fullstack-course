const Persons = ({ persons, handleDelete }) => {
    return <div>{persons.map((person) => {
        return <div key={person.name}>{ person.name } { person.number}<button type="button" onClick={() => handleDelete(person)}>delete</button></div>
    })}</div>
}

export default Persons;