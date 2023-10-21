import express from 'express';
import { calculateBMI } from './bmiCalculator';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const heightInCm: number = Number(req.query.height);
  const massInKg: number = Number(req.query.weight);

  if (isNaN(heightInCm) || isNaN(massInKg)) {
    return res.json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBMI(heightInCm, massInKg);

  return res.json({ weight: massInKg, height: heightInCm, bmi });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
