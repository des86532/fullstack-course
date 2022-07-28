export enum Gender {
  Male = 'male',
  Female = 'female'
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

// patient
export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
  entries?: Entry[]
}

export type InputPatientEntry = Omit<PatientEntry, 'id'>
export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >

export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string,
}

// health
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: object
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: object
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;