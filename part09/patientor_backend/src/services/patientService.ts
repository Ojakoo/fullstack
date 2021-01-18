import patientData from '../../data/patients';
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from '../types'; 

const getPatients = (): Array<PublicPatient> => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientByID = (id: string): Patient | undefined => {
  const patient = patientData.find(patient => patient.id === id);
  if ( patient ) {
    return {
      name: patient.name,
      ssn: patient.ssn,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: patient.entries,
      id: patient.id
    };
  }
  console.log(patient);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: patient.name + patient.dateOfBirth,
    ...patient
  };

  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const patient = patientData.find(patient => patient.id === id);
  const newEntry = {
    id: entry.date + entry.description,
    ...entry
  };
  if ( patient ) {
    patient.entries.push(newEntry);
  }
  return newEntry;
};

export default {
  getPatients,
  getPatientByID,
  addPatient,
  addEntry
};