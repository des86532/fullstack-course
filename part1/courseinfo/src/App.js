const Header = (content) => {
  console.log(content)
  return <h1>{ content.course }</h1>
}

const Part = (content) => {
  return (
    <p>{ content.part.name } { content.part.exercises }</p>
  )
}

const Content = (content) => {
  return (
    <>
      <Part part={content.parts[0]} />
      <Part part={content.parts[1]} />
      <Part part={content.parts[2]} />
    </>
  )
}

const Total = (content) => {
  return (
    <p>Number of exercises {content.parts[0].exercises + content.parts[1].exercises + content.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App