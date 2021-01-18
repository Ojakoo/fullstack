import React from "react";
import { Entry } from "../types";

import { useStateValue } from "../state";

interface PatientEntryProps {
  entry: Entry;
}

const PatientEntry: React.FC<PatientEntryProps> = ({ entry }) => {
  const [{ diagnoses }, ] = useStateValue();

    return (  
      <div>
        <p>{entry.date} {entry.description}</p>
        <ul>
          {entry.diagnosisCodes?.map(diagnosiscode =>
            <li>{diagnosiscode} {diagnoses[diagnosiscode] ? diagnoses[diagnosiscode].name : null}</li>
          )}
        </ul>
      </div>
    );
};

export default PatientEntry;