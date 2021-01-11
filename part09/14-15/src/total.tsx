import React from "react";
import { Course } from "./types";

interface TotalProps {
  courseParts: Array<Course>;
}

const Total: React.FC<TotalProps> = ({ courseParts }) => (
  <>
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  </>
);

export default Total;