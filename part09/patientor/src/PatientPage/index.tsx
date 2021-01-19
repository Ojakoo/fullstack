import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import PatientTitle from "./PatientTitle";
import PatientEntries from "./PatientEntries";
import AddHealthEntryModal from "../AddEntryModal/Health";
import AddHospitalEntryModal from "../AddEntryModal/Hospital";
import AddOccupationalEntryModal from "../AddEntryModal/Occupational";

import { Button } from "semantic-ui-react";

import { EntryFormValues } from "../AddEntryModal/FormField";
import { apiBaseUrl } from "../constants";
import { addEntry, setPatient, useStateValue } from "../state";
import { Patient, Entry } from "../types";

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
  const [healthModalOpen, setHealthModalOpen] = React.useState<boolean>(false);
  const [occupationalModalOpen, setOccupationalModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openHospitalModal = (): void => setHospitalModalOpen(true);
  const openHealthModal = (): void => setHealthModalOpen(true);
  const openOccupationalModal = (): void => setOccupationalModalOpen(true);

  const closeModal = (): void => {
    setHealthModalOpen(false);
    setHospitalModalOpen(false);
    setOccupationalModalOpen(false);
    setError(undefined);
  };

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
        <AddHealthEntryModal
          modalOpen={healthModalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />      
        <AddHospitalEntryModal
          modalOpen={hospitalModalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <AddOccupationalEntryModal
          modalOpen={occupationalModalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openHealthModal()}>Add New Health Entry</Button>
        <Button onClick={() => openHospitalModal()}>Add New Hospital Entry</Button>
        <Button onClick={() => openOccupationalModal()}>Add New Occupational Entry</Button>
      </div>
    );
  } else {
    return (
      <></>
    );
  }
};

export default PatientPage;