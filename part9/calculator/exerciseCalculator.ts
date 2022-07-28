const data = process.argv.slice(2).map(item => Number(item))

export const calculateExercises = (data: number[], target: number = 2) => {
  const sum = data.reduce((acc, cur) => acc + cur, 0)

  return {
    periodLength: data.length,
    trainingDays: data.filter((item) => item > 0).length,
    success: false,
    rating: Math.ceil(sum/data.length),
    ratingDescription: 'not too bad but could be better',
    target,
    average: sum/7
  }
}

console.log(calculateExercises(data))