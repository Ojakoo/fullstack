import patientData from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types'; 

const getPatients = (): Array<PublicPatient> => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {

  const newPatient = {
    id: "id",
    ...patient
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};