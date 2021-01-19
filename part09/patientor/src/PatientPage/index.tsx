import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import PatientTitle from "./PatientTitle";
import PatientEntries from "./PatientEntries";
import AddEntryModal from "../AddEntryModal";

import { Button } from "semantic-ui-react";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { apiBaseUrl } from "../constants";
import { addEntry, setPatient, useStateValue } from "../state";
import { Patient, Entry } from "../types";

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  

  React.useEffect(() => {
    console.log("useeff");
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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log(values);
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient ? patient.id : "0"}/entries`,
        values
      );
      dispatch(addEntry(newEntry, patient ? patient.id : "0"));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (patient) {
    return (
      <div>
        <PatientTitle name={patient.name} gender={patient.gender}/>
        <p>
          ssn: {patient.ssn} <br/>
          occupation: {patient.occupation}
        </p>
        <PatientEntries entries={patient.entries}/>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
    );
  } else {
    return (
      <></>
    );
  }
};

export default PatientPage;