import data from '../data/diagnose';
import { Diagnosis } from '../types';

export const getAll = (): Diagnosis[] => {
  return data;
};
