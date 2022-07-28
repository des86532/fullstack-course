import patientsData from '../../data/patients'
import { PatientEntry, Entry } from '../types'
import { v1 as uuid } from 'uuid'

const patients: Array<PatientEntry> = patientsData as Array<PatientEntry>

const getData = ():Array<PatientEntry> => {
  return patients
}

const findById = (id: string): PatientEntry | undefined => {
  return patientsData.find(patient => patient.id === id)
}

const addPatient = (data: Omit<PatientEntry, 'id'>): PatientEntry => {
  const newPatient = {
    id: uuid(),
    ...data
  }

  patients.push(newPatient)

  return newPatient
}

const addPatientEntry = (id: string, payload: Entry) => {
  const patient = patientsData.find(patient => patient.id === id)
  patient?.entries?.push({...payload, id: uuid() })

  return patient
}

export default { getData, findById, addPatient, addPatientEntry }