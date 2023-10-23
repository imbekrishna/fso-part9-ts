export interface DiaryEntry {
  id: string;
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

export type NewEntry = Omit<DiaryEntry, 'id'>;
