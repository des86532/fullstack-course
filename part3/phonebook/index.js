const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

function getRandomInt(max = 10000) {
  return Math.floor(Math.random() * max);
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/person/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(item => item.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/person/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  console.log(request.body)
  const { name, number } = request.body
  const nameAlreadyExist = persons.some((person) => person.name === name)

  if (!name || !number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  } else if (nameAlreadyExist) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    id: getRandomInt(),
    name,
    number
  }

  persons = [...persons, newPerson]

  response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})