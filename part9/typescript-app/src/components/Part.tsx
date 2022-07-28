import CoursePart from "../types"

const Part = ({ coursePart }: { coursePart: CoursePart}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (coursePart.type) {
    case "normal":
      return (
        <>
          <h3>{coursePart.name}{coursePart.exerciseCount}</h3>
          <p>{coursePart.description}</p>
        </>
      )
    case "groupProject":
      return (
        <>
          <h3>{coursePart.name}{coursePart.exerciseCount}</h3>
          <p>project exercise {coursePart.groupProjectCount}</p>
        </>
      )
    case "submission":
      return (
        <>
          <h3>{coursePart.name}{coursePart.exerciseCount}</h3>
          <p>{coursePart.description}</p>
          <p>submit to {coursePart.exerciseSubmissionLink}</p>
        </>
      )
    case "special":
      return (
        <>
          <h3>{coursePart.name}{coursePart.exerciseCount}</h3>
          <p>{coursePart.description}</p>
          <p>required skills: {coursePart.requirements.join(',')}</p>
        </>
      )
    default:
      return assertNever(coursePart)
  }
}

export default Part