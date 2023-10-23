import { Entry, Gender, NewPatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringField = (value: unknown): string => {
  if (!isString(value)) {
    throw new Error('Malformatted input. Expexted string');
  }

  return value;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (typeof entries !== 'object') {
    throw new Error('Incorrect or missing entries');
  }

  return entries as Entry[];
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'gender' in object &&
    'dateOfBirth' in object &&
    'occupation' in object &&
    'ssn' in object &&
    'entries' in object
  ) {
    const newPatient: NewPatient = {
      name: parseStringField(object.name),
      gender: parseGender(object.gender),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseStringField(object.occupation),
      ssn: parseStringField(object.ssn),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};
