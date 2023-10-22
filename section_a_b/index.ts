import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: 'parameters misssing',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  if (isNaN(target) || daily_exercises.some((e: number) => isNaN(e))) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return res.json(calculateExercise(daily_exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
