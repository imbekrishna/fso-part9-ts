import axios from 'axios';
import { DiaryEntry, NewEntry } from '../types';
const baseUrl = 'http://localhost:3001/api/diaries';

export const getAll = async (): Promise<DiaryEntry[]> => {
  const result = await axios.get(baseUrl);
  return result.data;
};

export const addNew = async (newEntry: NewEntry): Promise<DiaryEntry> => {
  const result = await axios.post(baseUrl, newEntry);
  return result.data;
};
