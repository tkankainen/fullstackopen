const Header = ({ course }) => <h2>{course.name}</h2>

const Note = ({ note, exercises }) => {
    return (
      <p>{note} {exercises}</p>
    )
}

const Total = ({ course }) => {
    let total = course.parts.map(sum => sum.exercises)
    return (
        <p><b>total of {total.reduce((s,p) => s + p)} exercises</b></p>
    )
}

const Course = ({ course }) => {

    console.log(course);
    return (
        <div>
            <Header course={course}/>
            {course.parts.map(part => 
                <Note key={part.id} note={part.name} exercises={part.exercises} />
            )}
            <Total course={course}/>
        </div>
    )
}

export default Course