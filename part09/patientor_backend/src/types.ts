export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export interface Entry {
  text: string
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
  Other = 'other',
  Male = 'male',
  Female = 'female',
  ApacheAttackHelicopter = 'apache attack helicopter',
}