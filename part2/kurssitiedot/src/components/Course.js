const Header = ({ course }) => <h2>{course.name}</h2>

const Note = ({ note, exercises }) => {
    return (
      <p>{note} {exercises}</p>
    )
}

const Total = ({ course }) => {
    const total = course.reduce((s, p) => (s + p.exercises), 0)
    return (
        <p><b>total of {total} exercises</b></p>
    )
}

const Course = ({ course }) => {

    return (
        <div>
            <Header course={course}/>
            {course.parts.map(part => 
                <Note key={part.id} note={part.name} exercises={part.exercises} />
            )}
            <Total course={course.parts}/>
        </div>
    )
}

export default Course