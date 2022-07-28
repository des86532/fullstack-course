import CoursePart from '../types'
import Part from '../components/Part'

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <>
      {parts.map((part, index) => <Part key={index} coursePart={part}></Part>)}
    </>
  )
}

export default Content