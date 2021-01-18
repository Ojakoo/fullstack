import React from "react";
import PatientEntry from "./PatientEntry";
import { Entry } from "../types";

interface PatientEntriesProps {
  entries: Entry[] | undefined;
}

const PatientEntries: React.FC<PatientEntriesProps> = ({ entries }) => {
  if (entries) {
    return(
      <div>
        <h3>Entries</h3>
        {entries.map(entry =>
          <PatientEntry key={entry.id} entry={entry}/>
        )}
      </div>
    );
  } else {
    return ( <></> );
  }
};

export default PatientEntries;