import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import PatientTitle from "./PatientTitle";
import PatientEntries from "./PatientEntries";

import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { Patient } from "../types";


const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [id, dispatch]);

  if (patient) {
    return (
      <div>
        <PatientTitle name={patient.name} gender={patient.gender}/>
        <p>
          ssn: {patient.ssn} <br/>
          occupation: {patient.occupation}
        </p>
        <PatientEntries entries={patient.entries}/>
      </div>
    );
  } else {
    return (
      <></>
    );
  }
};

export default PatientPage;