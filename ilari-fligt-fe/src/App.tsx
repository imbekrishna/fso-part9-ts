import { useEffect, useState } from 'react';
import DiaryForm from './components/DiaryForm';
import { DiaryEntry } from './types';
import { getAll } from './services/notes';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAll().then((res) => setEntries(res));
  }, []);

  const addEntry = (newEntry: DiaryEntry) => {
    setEntries(entries.concat(newEntry));
  };

  return (
    <>
      <h1>flight diary</h1>
      <DiaryForm addEntry={addEntry} />
      <h2>Diary Entries</h2>
      <div>
        {entries.map((entry) => {
          return (
            <div key={entry.id}>
              <h3>{entry.date}</h3>
              <p>visibility: {entry.visibility}</p>
              <p>weather: {entry.weather}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
