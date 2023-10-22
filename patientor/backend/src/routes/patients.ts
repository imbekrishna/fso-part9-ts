import express from 'express';
import patientService from '../services/patient';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Someting went wrong: ';
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;
