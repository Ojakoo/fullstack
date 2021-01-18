import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";

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
    // joo tää on tunkki mut pitää mennä kokouksee
    if (patient.gender === "male") {
      return (
        <div>
          <Header as="h2">{patient.name}  <Icon name={"mars"}/></Header>
          <p>
            ssn: {patient.ssn} <br/>
            occupation: {patient.occupation}
          </p>
        </div>
      );
    } else if (patient.gender === "female") {
        return (
          <div>
            <Header as="h2">{patient.name}  <Icon name={"venus"}/></Header>
            <p>
              ssn: {patient.ssn} <br/>
              occupation: {patient.occupation}
            </p>
          </div>
        );
    } else {
      return (
        <div>
          <Header as="h2">{patient.name}  <Icon name={"genderless"}/></Header>
          <p>
            ssn: {patient.ssn} <br/>
            occupation: {patient.occupation}
          </p>
        </div>
      );
    }
  } else {
    return (
      <></>
    );
  }
};

export default PatientPage;