"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseStringField = (value) => {
    if (!isString(value)) {
        throw new Error('Malformatted input. Expected string');
    }
    return value;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseEntries = (entries) => {
    if (typeof entries !== 'object') {
        throw new Error('Incorrect or missing entries');
    }
    return entries;
};
const parseCodes = (entries) => {
    if (!Array.isArray(entries) || entries.some((e) => !isString(e))) {
        throw new Error('Incorrect or missing diagnosis codes');
    }
    return entries.map((e) => String(e));
};
const isType = (param) => {
    return Object.values(types_1.EntryType)
        .map((v) => v.toString())
        .includes(param);
};
const parseType = (entryType) => {
    if (!isString(entryType) || !isType(entryType)) {
        throw new Error('Incorrect or missing entry type');
    }
    return entryType;
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating)
        .map((v) => v)
        .includes(param);
};
const parseHealthCheckRating = (healthRating) => {
    if (typeof healthRating !== 'number' || !isHealthCheckRating(healthRating)) {
        throw new Error('Incorrect or missing health rating: ' + healthRating);
    }
    return healthRating;
};
const parseDischarge = (discharge) => {
    if (!discharge ||
        typeof discharge !== 'object' ||
        !('date' in discharge) ||
        !('criteria' in discharge) ||
        !isString(discharge.criteria) ||
        !isDate(String(discharge.date))) {
        throw new Error('Incorrect or Missing discharge');
    }
    return {
        date: String(discharge.date),
        criteria: String(discharge.criteria),
    };
};
const parseSickLeave = (discharge) => {
    if (!discharge ||
        typeof discharge !== 'object' ||
        !('startDate' in discharge) ||
        !('endDate' in discharge) ||
        !isDate(String(discharge.startDate)) ||
        !isDate(String(discharge.endDate))) {
        throw new Error('Incorrect or missing sick leaves');
    }
    return {
        startDate: String(discharge.startDate),
        endDate: String(discharge.endDate),
    };
};
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object &&
        'gender' in object &&
        'dateOfBirth' in object &&
        'occupation' in object &&
        'ssn' in object &&
        'entries' in object) {
        const newPatient = {
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
exports.toNewPatient = toNewPatient;
const toNewEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('description' in object &&
        'date' in object &&
        'specialist' in object &&
        'diagnosisCodes' in object &&
        'type' in object) {
        if (object.type === types_1.EntryType.HealthCheck &&
            'healthCheckRating' in object) {
            const healthCheckEntry = {
                description: parseStringField(object.description),
                date: parseDate(object.date),
                specialist: parseStringField(object.specialist),
                diagnosisCodes: parseCodes(object.diagnosisCodes),
                type: parseType(object.type),
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            };
            return healthCheckEntry;
        }
        if (object.type === types_1.EntryType.Hospital && 'discharge' in object) {
            const hostpitaEntry = {
                description: parseStringField(object.description),
                date: parseDate(object.date),
                specialist: parseStringField(object.specialist),
                diagnosisCodes: parseCodes(object.diagnosisCodes),
                type: parseType(object.type),
                discharge: parseDischarge(object.discharge),
            };
            return hostpitaEntry;
        }
        if (object.type === types_1.EntryType.OccupationalHealthcare &&
            'employerName' in object &&
            'sickLeave' in object) {
            const occupationalEntry = {
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
exports.toNewEntry = toNewEntry;
