const height = Number(process.argv[2])
const weight = Number(process.argv[3])

export const calculateBmi = (_height: number, _weight: number) => {
  const bmi = weight / (height/100) ** 2

  if (bmi < 18.5) {
    return 'underweight'
  } else if (bmi < 25) {
    return 'healthy weight'
  } else if (bmi < 30) {
    return 'overweight'
  } else {
    return 'obesity'
  }
}

console.log(calculateBmi(height, weight))