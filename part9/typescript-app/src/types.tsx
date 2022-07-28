type CoursePart = CourseNormalPart | CourseGroupProjectPart | CourseSubmissionPart | CourseSpecialPart

interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CourseNormalPart extends CoursePartBase {
  type: 'normal'
  description: string
}

interface CourseGroupProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}

interface CourseSubmissionPart extends CoursePartBase {
  type: 'submission'
  description: string
  exerciseSubmissionLink: string
}

interface CourseSpecialPart extends CoursePartBase {
  type: 'special'
  description: string
  requirements: string[]
}

export default CoursePart