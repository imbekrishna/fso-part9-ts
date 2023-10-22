import data from '../data/patients';
import { NewPatient, Patient, SanitizedPatient } from '../types';
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

const addPatient = (patient: NewPatient): Patient => {
  const id:string = uuid();
  const newPatient = {
    id,
    ...patient,
  };

  data.push(newPatient);

  return newPatient;
};

export default {
  getAll,
  addPatient,
};
