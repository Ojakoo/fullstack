/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewEntry, NewPatient, Gender, Entry, Discharge, SickLeave, HealthCheckRating } from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
  
  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: any): NewEntry => {
  switch (object.type) {
    case "Hospital":
      return {
        type: "Hospital",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        discharge: parseDischarge(object.discharge)
      };
    case "HealthCheck":
      return {
        type: "HealthCheck",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case "OccupationalHealthcare":
      return {
        type: "OccupationalHealthcare",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
    default:
      throw new Error('Incorrect or missing type' + object.type);
  }
};

//parsers
const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name' + name);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn' + ssn);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation' + occupation);
  }
  return occupation;
};

const parseEntries = (entries: any[]): Entry[] => {
  if (!entries || !isEntryArray(entries)) {
    throw new Error('Missing entries' + entries);
  }
  return entries;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description' + description);
  }
  return description;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date' + date);
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist' + specialist);
  }
  return specialist;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge' + discharge);  
  }
  return discharge;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickLeave' + sickLeave);  
  }
  return sickLeave;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name' + employerName);
  }
  return employerName;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if ((healthCheckRating && healthCheckRating !== 0) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {
  if (!diagnosisCodes || !isStringArray(diagnosisCodes)) {
    throw new Error('Missing diagnosisCodes' + diagnosisCodes);
  }
  return diagnosisCodes;
};

//typeguards
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isEntryArray = (param: any[]): param is Entry[] => {
  for (const entry of param) {
    if ( !isEntry(entry) ) {
      return ( false );
    }
  }
  return ( true );
};

const isEntry = (param: any): param is Entry => {
  switch (param.type) {
    case "Hospital":
      return ( true );
    case "OccupationalHealthcare":
      return ( true );
    case "HealthCheck":
      return ( true );
    default:
      return ( false );
  }
};

const isDischarge = (param: any): param is Discharge => {
  return !(!param.date || !isString(param.date) || !param.criteria || !isString(param.criteria));
};

const isSickLeave = (param: any): param is SickLeave => {
  return !(!param.startDate || !isString(param.startDate) || !param.endDate || !isString(param.endDate));
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isStringArray = (param: any[]): param is string[] => {
  for (const entry of param) {
    if ( !isString(entry) ) {
      return ( false );
    }
  }
  return ( true );
};