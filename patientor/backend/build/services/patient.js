"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getAll = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        };
    });
};
const getOne = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    if (patient) {
        return patient;
    }
    throw new Error(`User with id: ${id} not found.`);
};
const addPatient = (patient) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (patientId, newEntry) => {
    const patient = getOne(patientId);
    if (patient) {
        const id = (0, uuid_1.v1)();
        const addedEntry = Object.assign({ id }, newEntry);
        patient.entries.push(addedEntry);
        return patient;
    }
    throw new Error('Error adding entry!');
};
exports.default = {
    getAll,
    addPatient,
    getOne,
    addEntry,
};
