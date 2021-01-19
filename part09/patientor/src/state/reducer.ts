import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
    id: string;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      const obj = {
        ...state,
      };
      if ( obj.patient ) {
        obj.patient.entries?.push(action.payload);
      }
      obj.patients[action.id].entries?.push(action.payload);
      return (obj);
    default:
      return state;
  }
};

export const setPatientList = ( patientListFromApi: Patient[] ): Action => {
  return {
    type: "SET_PATIENT_LIST", payload: patientListFromApi
  };
};

export const addPatient = ( newPatient: Patient ): Action => {
  return {
    type: "ADD_PATIENT", payload: newPatient
  };
};

export const setPatient = ( patientFromApi: Patient ): Action => {
  return {
    type: "SET_PATIENT", payload: patientFromApi
  };
};

export const setDiagnoses = ( diagnosesFromApi: Diagnosis[] ): Action => {
  return {
    type: "SET_DIAGNOSES", payload: diagnosesFromApi
  };
};

export const addEntry = ( entryFromApi: Entry, id: string ): Action => {
  console.log(entryFromApi);
  return {
    type: "ADD_ENTRY", payload: entryFromApi, id: id
  };
};