import express from 'express';
import { getAll } from '../controllers/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(getAll());
});

export default router;