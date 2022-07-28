import express from 'express'
import diagnosesService from '../service/diagnose'

const router = express.Router()
const { getData } = diagnosesService

router.get('/', (_req, res) => {
  res.json(getData())
})

export default router