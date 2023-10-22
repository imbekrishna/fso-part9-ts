import data from '../data/patients';
import { SanitizedPatient } from '../types';

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

export default {
  getAll,
};
