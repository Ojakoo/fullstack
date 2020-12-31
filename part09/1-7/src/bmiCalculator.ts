interface Values {
  h: number;
  w: number;
}

const parseBmiArguments = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
    h: Number(args[2]),
    w: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

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

try {
  const { h, w } = parseBmiArguments(process.argv);
  console.log(calculateBmi(h, w));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}