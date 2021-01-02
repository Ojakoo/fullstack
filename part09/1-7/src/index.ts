import express from 'express';
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const h: number = Number(req.query.height);
    const w: number = Number(req.query.weight);

    if (!h || !w) throw new Error('One or more values missing!')
    if (isNaN(h) || isNaN(w)) throw new Error('Provided values were not numbers!')

    res.send({
      weight: w,
      height: h,
      bmi: calculateBmi(h, w)
    });
  } catch (e) {
    res.send({
      error: e.message
    })
  }
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});