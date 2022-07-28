import express from 'express'
import patientsService from '../service/patient'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(patientsService.getData())
})

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id)
  if (patient) {
    res.send(patient)
  } else {
    res.sendStatus(404)
  }
})

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body
  const newPatient = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries: []
  })

  res.json(newPatient)
})

router.post('/:id/entries', (req, res) => {
  const body = req.body
  const newEntry = patientsService.addPatientEntry(
    req.params.id,
    {
      ...body
    }
  )

  res.json(newEntry)
})

export default router