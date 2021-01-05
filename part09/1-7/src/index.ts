import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ReturnData } from "./exerciseCalculator";

const app = express();
app.use(express.json());

interface PostBody {
  daily_exercises?: Array<number>,
  target?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNumberArray = (array: Array<any>): array is Array<number> => {
  for (const item of array) {
    if (!(typeof item === 'number')) {
      return false;
    }
  }
  return true;
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const h = Number(req.query.height);
    const w = Number(req.query.weight);

    if (!h || !w) throw new Error('One or more values missing!');
    if (isNaN(h) || isNaN(w)) throw new Error('Provided values were not numbers!');

    res.send({
      weight: w,
      height: h,
      bmi: calculateBmi(h, w)
    });
  } catch (e) {
    res.send({
      // throw catch not typesafe but no better option represented in materials
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      error: e.message
    });
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = req.body as PostBody;

    console.log(body);

    if (!body.daily_exercises || !body.target) throw new Error('Not enough arguments');
    if (!(typeof body.target === 'number')) throw new Error('malformatted parameters (target)');
    if (!isNumberArray(body.daily_exercises)) throw new Error('malformatted parameters (daily_exercises)');
    
    const returnObject: ReturnData = calculateExercises(body.daily_exercises, body.target);
    res.send(returnObject);
    
  } catch (e) {
    res.send({
      // throw catch not typesafe but no better option represented in materials
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      error: e.message
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});