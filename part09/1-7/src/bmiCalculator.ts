const calculateBmi = (h: number, w: number): string => {
const bmi = w / ( (h * h) / 10000 );
  //console.log("BMI:", bmi);
  if (bmi < 18.5) {
    return ('Underweight (not healthy weight)');
  } else if (bmi < 25) {
    return ('Normal (healthy weight)');
  } else if (bmi < 30) {
    return ('Overweight (not healthy weight)');
  } else {
    return ('Obese (not healthy weight)');
  }
}

console.log(calculateBmi(180, 74));