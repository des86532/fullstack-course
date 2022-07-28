import express from 'express'
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator'

const app = express()
const PORT = 3003;

// Middleware
app.use(express.json());

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query
  const bmi = calculateBmi(Number(height), Number(weight))

  if (!(height && weight)) {
    res.send({
      error: "malformatted parameters"
    })
  }

  res.send({
    height,
    weight,
    bmi,
  })
})

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.post('/exercises', (req, res) => {
  const body = req.body

  if (!(body.daily_exercises && body.target)) {
    res.send({
      error: "parameters missing"
    })
  }

  res.json(calculateExercises(body.daily_exercises, body.target))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});