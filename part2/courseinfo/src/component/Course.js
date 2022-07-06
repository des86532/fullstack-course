const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ name }) => {
  return <h2>{ name }</h2>
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => <Part part={part} key={part.id} />)}
    </>
  )
}
  
const Part = ({ part }) => {
  return (
    <p>{ part.name } { part.exercises }</p>
  )
}

const Total = ({ parts }) => {
  return (
    <b>total of {parts.reduce((acc, cur) => acc + cur.exercises, 0)} exercises</b>
  )
}

export default Course;