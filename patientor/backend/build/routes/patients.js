"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patient_1 = __importDefault(require("../services/patient"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patient_1.default.getAll());
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.toNewPatient)(req.body);
        const addedPatient = patient_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Someting went wrong: ';
        if (error instanceof Error) {
            errorMessage += `Error: ${error.message}`;
        }
        res.status(400).send(errorMessage);
    }
});
router.get('/:id', (req, res) => {
    try {
        const patient = patient_1.default.getOne(req.params.id);
        res.json(patient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ` Error: ${error.message}`;
        }
        res.status(404).json({ error: errorMessage });
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const addedEntry = patient_1.default.addEntry(req.params.id, newEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Somethin went wrong.';
        if (error instanceof Error) {
            errorMessage += `${error.message}`;
        }
        res.status(400).json({ error: errorMessage });
    }
});
exports.default = router;
