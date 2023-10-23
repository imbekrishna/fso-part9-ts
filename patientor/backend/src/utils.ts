import {
  Diagnosis,
  Entry,
  EntryType,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatient,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringField = (value: unknown): string => {
  if (!isString(value)) {
    throw new Error('Malformatted input. Expected string');
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

const parseCodes = (entries: unknown): Diagnosis['code'][] => {
  if (!Array.isArray(entries) || entries.some((e) => !isString(e))) {
    throw new Error('Incorrect or missing diagnosis codes');
  }

  return entries.map((e) => String(e));
};

const isType = (param: string): param is EntryType => {
  return Object.values(EntryType)
    .map((v) => v.toString())
    .includes(param);
};

const parseType = (entryType: unknown): EntryType => {
  if (!isString(entryType) || !isType(entryType)) {
    throw new Error('Incorrect or missing entry type');
  }

  return entryType;
};
const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v)
    .includes(param);
};

const parseHealthCheckRating = (healthRating: unknown): HealthCheckRating => {
  if (typeof healthRating !== 'number' || !isHealthCheckRating(healthRating)) {
    throw new Error('Incorrect or missing health rating: ' + healthRating);
  }

  return healthRating;
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (
    !discharge ||
    typeof discharge !== 'object' ||
    !('date' in discharge) ||
    !('criteria' in discharge) ||
    !isString(discharge.criteria) ||
    !isDate(String(discharge.date))
  ) {
    throw new Error('Incorrect or Missing discharge');
  }
  return {
    date: String(discharge.date),
    criteria: String(discharge.criteria),
  };
};

const parseSickLeave = (
  discharge: unknown
): { startDate: string; endDate: string } => {
  if (
    !discharge ||
    typeof discharge !== 'object' ||
    !('startDate' in discharge) ||
    !('endDate' in discharge) ||
    !isDate(String(discharge.startDate)) ||
    !isDate(String(discharge.endDate))
  ) {
    throw new Error('Incorrect or missing sick leaves');
  }
  return {
    startDate: String(discharge.startDate),
    endDate: String(discharge.endDate),
  };
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

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'diagnosisCodes' in object &&
    'type' in object
  ) {
    if (
      object.type === EntryType.HealthCheck &&
      'healthCheckRating' in object
    ) {
      const healthCheckEntry: NewEntry = {
        description: parseStringField(object.description),
        date: parseDate(object.date),
        specialist: parseStringField(object.specialist),
        diagnosisCodes: parseCodes(object.diagnosisCodes),
        type: parseType(object.type),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };

      return healthCheckEntry;
    }

    if (object.type === EntryType.Hospital && 'discharge' in object) {
      const hostpitaEntry: NewEntry = {
        description: parseStringField(object.description),
        date: parseDate(object.date),
        specialist: parseStringField(object.specialist),
        diagnosisCodes: parseCodes(object.diagnosisCodes),
        type: parseType(object.type),
        discharge: parseDischarge(object.discharge),
      };
      return hostpitaEntry;
    }

    if (
      object.type === EntryType.OccupationalHealthcare &&
      'employerName' in object &&
      'sickLeave' in object
    ) {
      const occupationalEntry: NewEntry = {
        description: parseStringField(object.description),
        date: parseDate(object.date),
        specialist: parseStringField(object.specialist),
        diagnosisCodes: parseCodes(object.diagnosisCodes),
        type: parseType(object.type),
        employerName: parseStringField(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
      return occupationalEntry;
    }
  }

  throw new Error('Type missing!');
};
