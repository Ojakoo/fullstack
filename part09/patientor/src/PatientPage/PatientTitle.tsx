import React from "react";
import { Header, Icon } from "semantic-ui-react";
import { Gender } from "../types";

interface PatientTitleProps {
  name: string;
  gender: Gender;
}

const PatientTitle: React.FC<PatientTitleProps> = ({ name, gender }) => {
  if (gender === "male") {
    return (
      <Header as="h2">{name}  <Icon name={"mars"}/></Header>
    );
  } else if (gender === "female") {
    return (
      <Header as="h2">{name}  <Icon name={"venus"}/></Header>
    );
  } else {
    return (
      <Header as="h2">{name}  <Icon name={"genderless"}/></Header>
    );
  }
};

export default PatientTitle;

