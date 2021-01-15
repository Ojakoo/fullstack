import React from "react";
import { CoursePart } from "./types"
import Part from "./part"

interface ContentsProps {
  courseParts: Array<CoursePart>;
}

const Contents: React.FC<ContentsProps> = ({ courseParts }) => (
  <>
    {courseParts.map(coursePart => 
      <Part key={coursePart.name} coursePart={coursePart}/>
    )};
  </>
);

export default Contents;