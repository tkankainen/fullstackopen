import React from "react"

const Persons = ({ personsToShow, deletePerson }) => {
    return (
    personsToShow.map(person =>
      <p key={person.name}>{person.name} {person.number} 
      <button onClick={() => deletePerson(person.id)}>Delete</button></p>
      )
    )
}

export default Persons