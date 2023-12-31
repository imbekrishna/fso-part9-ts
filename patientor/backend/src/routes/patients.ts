import express from 'express';
import patientService from '../services/patient';
import { toNewPatient, toNewEntry } from '../utils';

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

router.get('/:id', (req, res) => {
  try {
    const patient = patientService.getOne(req.params.id);
    res.json(patient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }

    res.status(404).json({ error: errorMessage });
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = 'Somethin went wrong.';
    if (error instanceof Error) {
      errorMessage += `${error.message}`;
    }
    res.status(400).json({ error: errorMessage });
  }
});

export default router;
