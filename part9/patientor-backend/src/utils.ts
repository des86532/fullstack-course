import { Gender, InputPatientEntry } from "./types"

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isGender = (str: any): str is Gender => {
  return Object.values(Gender).includes(str)
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name")
  }

  return name
}

const parseDateOfBirth = (birth: unknown): string => {
  if (!birth || !isString(birth) || !isDate(birth)) {
    throw new Error("Incorrect or missing birth")
  }

  return birth
}

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn")
  }

  return ssn
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender")
  }

  return gender
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation")
  }

  return occupation
}

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown }

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): InputPatientEntry => {
  const newPatient: InputPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  }

  return newPatient
}
