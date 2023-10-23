import data from '../data/patients';
import {
  NewEntry,
  NewPatient,
  Patient,
  SanitizedPatient,
} from '../types';
import { v1 as uuid } from 'uuid';

const getAll = (): SanitizedPatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const getOne = (id: string) => {
  const patient = data.find((p) => p.id === id);

  if (patient) {
    return patient;
  }

  throw new Error(`User with id: ${id} not found.`);
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id,
    ...patient,
  };

  data.push(newPatient);

  return newPatient;
};

const addEntry = (patientId: string, newEntry: NewEntry): Patient => {
  const patient = getOne(patientId);
  if (patient) {
    const id: string = uuid();
    const addedEntry = {
      id,
      ...newEntry,
    };

    patient.entries.push(addedEntry);
    return patient;
  }

  throw new Error('Error adding entry!');
};

export default {
  getAll,
  addPatient,
  getOne,
  addEntry,
};
