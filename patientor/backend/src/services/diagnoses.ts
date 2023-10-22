import data from '../data/diagnose';
import { Diagnosis } from '../types';

const getAll = (): Diagnosis[] => {
  return data;
};

export default { getAll };
